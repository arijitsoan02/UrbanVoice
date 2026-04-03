import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt'
import validator from 'validator'

const generateToken = (id, role) => {
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

//signUp
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.json({ success: false, message: 'User Already exist' })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please Enter a valid email' })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: generateToken(user._id, "user"),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: "user",
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//Login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = generateToken('admin_id', 'admin');
            return res.json(
                {
                    success: true,
                    message: 'Admin Logged in successfully',
                    token: token,
                    user: {
                        id: "admin_id",
                        email: process.env.ADMIN_EMAIL,
                        role: "admin",
                    }
                }
            )
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = generateToken(user._id, 'user');
            return res.json({
                success: true,
                message: 'User logged in sucessfully',
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
        } else {
            return res.json({ success: false, message: "wrong password" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// GET ALL USERS - FOR ADMIN
export const getAllUsers = async (req, res) => {
    try {
        // Find all users but don't send their passwords to the frontend
        const users = await User.find({}).select('-password');
        return res.json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// DELETE USER - FOR ADMIN
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        return res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}