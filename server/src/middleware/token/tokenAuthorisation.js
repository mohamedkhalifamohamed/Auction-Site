import jwt from 'jsonwebtoken';

const SECRET_KEY = 'gogetyourkey';  // Should be kept secret and possibly stored in environment variables

// Function to generate a token
export const generateToken = (user) => {
    const payload = {
        userID: user.userID,
        email: user.email,
        isAdmin: user.isAdmin
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });  // Tokens expire in 1 hour
};

// Function to verify a token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error("Unable to verify token (Invalid or expired)!");
    }
};