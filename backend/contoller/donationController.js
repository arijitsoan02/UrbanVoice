import Stripe from 'stripe';
import Donation from '../models/donation.js';
import User from '../models/user.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createDonationSession = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id; // From authUser middleware

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // 1. Create a Checkout Session with Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd', // or your preferred currency
                        product_data: {
                            name: `Donation to UrbanVoice by ${user.name}`,
                        },
                        unit_amount: amount * 100, // Stripe works in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/donation?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}/donation?canceled=true`,
            customer_email: user.email,
        });

        // 2. Save the pending donation in your database
        await Donation.create({
            userId: user._id,
            name: user.name,
            amount: amount,
            stripeSessionId: session.id,
            status: 'Pending'
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("STRIPE ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};