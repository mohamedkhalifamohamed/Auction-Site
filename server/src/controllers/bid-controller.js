import { bids, watches } from '../data/data.js';
import { verifyToken } from '../middleware/token/tokenAuthorisation.js';  // Import your token authorization function

// Helper function for validation
const isInteger = (value) => Number.isInteger(value);

// Create a new bid (token in Authorization header)
export const createBid = (req, res) => {
    // Check for Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Verify and decode the JWT token using your verifyToken function
    let decodedToken;
    try {
        decodedToken = verifyToken(token);  // Use your verifyToken function
    } catch (error) {
        return res.status(403).json({ error: error.message });  // Handle invalid or expired tokens
    }

    const userID = decodedToken.userID;  // Extract userID from the decoded token
    const { amount } = req.body;  // Extract bid amount from the request body

    // Validate amount is an integer
    if (!isInteger(amount)) {
        return res.status(400).json({ message: 'Amount must be an integer' });
    }

    // Validate amount is greater than 0 (no negative or zero bids)
    if (amount <= 0) {
        return res.status(400).json({ message: 'Bid amount must be greater than zero' });
    }

    // Find the watch by its ID
    const watch = watches.find(w => w.watchID === parseInt(req.params.watchID));
    if (!watch) {
        return res.status(404).json({ error: 'Watch not found' });
    }

    // Ensure the bid is greater than or equal to the watch's original price
    if (amount < watch.price) {
        return res.status(400).json({ message: `Bid amount must be at least the original price of ${watch.price}` });
    }

    // Create a new bid object
    const newBid = {
        bidID: bids.length + 1,
        userID: userID,  // Use the userID extracted from the token
        watchID: watch.watchID,
        amount
    };

    // Add the new bid to the list of bids
    bids.push(newBid);

    // Return the new bid with a 201 status
    res.status(201).json(newBid);
};

// Get all bids for a specific watch
export const getBidsForWatch = (req, res) => {
    const watchBids = bids.filter(bid => bid.watchID === parseInt(req.params.watchID));
    if (watchBids.length === 0) return res.status(404).json({ error: 'No bids found for this watch' });
    res.json(watchBids);
};

// Get all bids for a specific user
export const getBidsForUser = (req, res) => {
    const userBids = bids.filter(bid => bid.userID === parseInt(req.params.userID));
    if (userBids.length === 0) return res.status(404).json({ error: 'No bids found for this user' });
    res.json(userBids);
};