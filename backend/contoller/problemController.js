import Problem from "../models/problem.js";


// Create Problem
export const createProblem = async (req, res) => {
    try {
        const { title, description, category, location } = req.body;
        const imageUrls = req.files ? req.files.map(file => file.path) : [];
        const problem = await Problem.create({
            title: title,
            description: description,
            category: category,
            location: location,
            images: imageUrls,
            createdBy: req.user.id,
        })

        return res.json({ success: true, message: 'Problem created sucessfully', problem: problem })
    } catch (error) {
        console.log("CREATE ERROR:", JSON.stringify(error, null, 2)); // This will expand the object
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

// GET ALL PROBLEMS
export const getAllProblem = async (req, res) => {
    try {
        const problem = await Problem.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });
        if (!problem) {
            res.json({ success: false, message: 'Problem not found' });
        }
        return res.json({ success: true, message: 'Problem data found', problem: problem });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// GET A SINGLE PROBLEM
export const getSingleProblem = async (req, res) => {
    try {
        const problemId = req.params.id;
        const problem = await Problem.findById(problemId);
        if (!problem) {
            res.json({ success: false, message: 'Problem not found' });
        }
        return res.json({ success: true, message: 'Problem found', problem: problem })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//GET INDIVIDUAL USER'S PROBLEM
export const myProblem = async (req, res) => {
    try {
        const userId = req.user.id;
        // CHANGE 'userId' to 'createdBy' to match your Schema
        const problem = await Problem.find({ createdBy: userId }); 
        
        if (!problem || problem.length === 0) {
            return res.json({ success: true, message: 'No problems found for this user', problem: [] });
        }
        
        return res.json({ success: true, message: 'Problems found', problem: problem })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// VOTE FOR PROBLEM
export const voteProblem = async (req, res) => {
    try {
        const problemId = req.params.id;
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.json({ success: false, message: 'Problem not found' });
        }
        if (problem.votes.includes(req.user.id)) {
            return res.json({ success: false, message: 'You alredy voted' })
        }
        problem.votes.push(req.user.id);
        await problem.save();

        return res.json({
            success: true,
            message: "Voted successfully",
            totalVotes: problem.votes.length,
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// UPDATE STATUS - FOR ADMIN
export const updateStatus = async (req, res) => {
    try {
        const problemId = req.params.id;
        const problem = await Problem.findById(problemId);
        const { status } = req.body;
        if (!problem) {
            return res.json({ success: false, message: 'Problem not found' });
        }
        problem.status = status;
        await problem.save();
        return res.json({ success: true, message: 'Status updated successfully', problem: problem })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//DELETE PROBLEM - FOR ADMIN
export const deleteProblem = async (req, res) => {
    try {
        const problemId = req.params.id;
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.json({ success: false, message: 'Problem not found' });
        }
        await problem.deleteOne();
        return res.json({ success: true, message: 'Problem deleted successfully' })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
