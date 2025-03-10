import { verifyToken } from './token/tokenAuthorisation.js';  // Adjust the import path as needed

export const isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Extract token from 'Authorization' header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);  // Verify the token

        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        req.user = decoded;  // Attach decoded token info to req.user
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};