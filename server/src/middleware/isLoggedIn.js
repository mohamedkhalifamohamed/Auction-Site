import { verifyToken } from './token/tokenAuthorisation.js';  // Adjust the import path as needed

export const isLoggedIn = (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');  // Extract token without 'Bearer' prefix

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = verifyToken(token);  // Verify the token
        req.user = decoded;  // Attach decoded token info to req.user
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};