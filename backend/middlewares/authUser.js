import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Token not found, Log in again" })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;        
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid token, please login again",
        });
    }
}

export default authUser;