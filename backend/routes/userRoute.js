import express from 'express';
import { login, signUp, getAllUsers, deleteUser } from '../contoller/userController.js';
import authUser from '../middlewares/authUser.js';
import adminOnly from '../middlewares/adminOnly.js';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);

// Admin Routes
userRouter.get('/all-users', authUser, adminOnly, getAllUsers);
userRouter.delete('/delete-user/:id', authUser, adminOnly, deleteUser);

export default userRouter;