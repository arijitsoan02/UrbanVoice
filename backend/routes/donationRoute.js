import express from 'express';
import authUser from '../middlewares/authUser.js';
import { createDonationSession } from '../contoller/donationController.js';

const donationRouter = express.Router();

// Only logged-in users can donate
donationRouter.post('/create-session', authUser, createDonationSession);

export default donationRouter;