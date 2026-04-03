import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String, enum: ["Road", "Water", "Electricity", "Garbage", "Other"], required: true
    },
    images: {
        type: [String],
        default: [],
    },
    location: { type: String, required: true },
    status: { type: String, enum: ["Submitted", "Accepted", "Rejected", "In Progress", "Resolved"], default: 'Submitted' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, { timestamps: true });

problemSchema.index({ createdAt: -1 });

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;