import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user-controller.js';
import {loginUser} from "../controllers/token-controller.js";

const router = express.Router();

// Route to get all users
router.get('/', getAllUsers);

// Route to get a specific user by ID
router.get('/:userID', getUserById);

// Route to create a new user
router.post('/', createUser);

// Route to update an existing user
router.put('/:userID', updateUser);

// Route to delete a user
router.delete('/:userID', deleteUser);

//Route to log a user
router.post('/login', loginUser);


export default router;