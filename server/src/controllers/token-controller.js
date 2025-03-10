import {generateToken, verifyToken} from '../middleware/token/tokenAuthorisation.js';
import bcrypt from 'bcrypt';
import { users } from "../data/data.js";

// Login Controller
export const loginUser = async (req, res) => {
    const { email, password } = req.body;  // Extracting email and password from request

    // Check if email or password is missing
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log(email);
    console.log(users);

    // Find the user by email from the in-memory users array
    const user = users.find(u => u.email === email);

    if (!user) {
        // If user is not found, return a 401 Unauthorized status
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log(password);

    // Validate the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        // If password doesn't match, return a 401 Unauthorized status
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken(user);

    console.log(token);

    // Send back the generated token to the client
    res.status(200).json({ token });
};

// Middleware to protect routes that require authentication
export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        // If no token is provided, return a 403 Forbidden status
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the verifyToken function
        const decoded = verifyToken(token);
        req.user = decoded;  // Attach the decoded user data to the request object
        next();  // Allow the request to proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};