import express from 'express';
import { getBidsForWatch, getBidsForUser, createBid } from '../controllers/bid-controller.js';
import {isLoggedIn} from "../middleware/isLoggedIn.js";

const router = express.Router();

// Route to get all bids for a specific watch
router.get('/watches/:watchID/bids', getBidsForWatch);

// Route to get all bids for a specific user
router.get('/users/:userID/bids', getBidsForUser);

// Route to create a new bid
router.post('/watches/:watchID/bids', isLoggedIn,  createBid);

export default router;