import express from 'express';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
import { createProblem, deleteProblem, getAllProblem, getSingleProblem, myProblem, updateStatus, voteProblem } from '../contoller/problemController.js';
import adminOnly from '../middlewares/adminOnly.js';

const problemRouter=express.Router();

problemRouter.post('/create',authUser,upload.array('images', 5),createProblem);
problemRouter.get('/list',getAllProblem);
problemRouter.get('/myproblems',authUser,myProblem);
problemRouter.get('/:id',getSingleProblem);
problemRouter.post('/:id/vote', authUser,voteProblem);
problemRouter.put('/:id/status',authUser, adminOnly, updateStatus);
problemRouter.delete('/:id/delete',authUser, adminOnly, deleteProblem);

export default problemRouter;

