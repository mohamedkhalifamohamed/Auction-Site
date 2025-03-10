import express from 'express';
import {
    getAllWatches,
    getWatchById,
    createWatch,
    updateWatch,
    deleteWatch,
    getWatchByBrand
} from '../controllers/watch-controller.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// Route to get all watches, with optional filters
router.get('/', getAllWatches);

// Route to get a specific watch by ID
router.get('/:watchID', getWatchById);

// Route to add a new watch - restricted to admin users
router.post('/', isLoggedIn, isAdmin, createWatch);

// Route to update a specific watch - restricted to admin users
router.put('/:watchID', isLoggedIn, isAdmin, updateWatch);

// Route to delete a specific watch - restricted to admin users
router.delete('/:watchID', isLoggedIn, isAdmin, deleteWatch);

// Route to get a watch by brand name
router.get('/brand/:brand', getWatchByBrand);

export default router;