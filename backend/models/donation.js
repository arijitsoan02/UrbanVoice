import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'Pending' 
    },
    stripeSessionId: { 
        type: String 
    }
}, { timestamps: true });

const Donation = mongoose.models.donation || mongoose.model("donation", donationSchema);
export default Donation;