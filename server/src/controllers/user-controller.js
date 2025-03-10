import { users } from '../data/data.js';
import bcrypt from 'bcrypt';

// Helper functions for validation
const isString = (value) => typeof value === 'string' && value.trim().length > 0;
const isBoolean = (value) => typeof value === 'boolean';

// Get all users
export const getAllUsers = (req, res) => {
    res.json(users);
};

// Get a single user by ID
export const getUserById = (req, res) => {
    const user = users.find(u => u.userID === parseInt(req.params.userID));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
};

// Create a new user
export const createUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    // Validate inputs
    if (!isString(name) || !isString(email) || !isString(password)) {
        return res.status(400).json({ message: 'Name, email, and password must be valid strings' });
    }

    // Validate email format (basic email regex validation)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (isAdmin !== undefined && !isBoolean(isAdmin)) {
        return res.status(400).json({ message: 'isAdmin must be a boolean' });
    }

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create the new user object
        const newUser = {
            userID: users.length + 1, // Generate a new user ID
            name,
            email,
            password: hashedPassword, // Store the hashed password
            isAdmin: isAdmin || false // Default to false if isAdmin is not provided
        };

        // Save the user to the database (or in-memory array in this case)
        users.push(newUser);

        // Respond with the created user (excluding the password in the response for security)
        const { password: _, ...userWithoutPassword } = newUser; // Exclude the password in response
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const user = users.find(u => u.userID === parseInt(req.params.userID));
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { name, email, password, isAdmin } = req.body;

    // Function to validate email format
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    // Validate inputs
    if (name && !isString(name)) return res.status(400).json({ message: 'Name must be a valid string' });
    if (email && (!isString(email) || !isValidEmail(email))) {
        return res.status(400).json({ message: 'Email must be a valid email address' });
    }
    if (password && !isString(password)) return res.status(400).json({ message: 'Password must be a valid string' });
    if (isAdmin !== undefined && !isBoolean(isAdmin)) return res.status(400).json({ message: 'isAdmin must be a boolean' });

    try {
        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            // Hash the new password before storing it
            user.password = await bcrypt.hash(password, 10);
        }
        if (isAdmin !== undefined) user.isAdmin = isAdmin;

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete a user
export const deleteUser = (req, res) => {
    const userIndex = users.findIndex(u => u.userID === parseInt(req.params.userID));
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    users.splice(userIndex, 1);
    res.status(204).send();
};