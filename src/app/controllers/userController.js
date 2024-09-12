import * as userService from '../services/userService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendSMS } from '../services/twilioService.js'; // Import Twilio SMS service

// Create (Sign Up) a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if the user already exists
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await userService.createUser({
            name,
            email,
            password: hashedPassword,
            phone
        });

        // Send an SMS after successful signup
        const smsMessage = `Hello ${name}, thank you for signing up! Your account was successfully created.`;
        await sendSMS(phone, smsMessage); // This will send an SMS to the user's phone

        res.status(201).json({ message: 'User registered successfully and SMS sent', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login (Sign In) a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Request password reset (Forgot Password)
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate password reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = await bcrypt.hash(resetToken, 10);
        const tokenExpiry = Date.now() + 3600000; // 1 hour

        // Save token and expiry to user
        await userService.savePasswordResetToken(user._id, resetTokenHash, tokenExpiry);

        // Send email with reset link (or return token for testing)
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&userId=${user._id}`;
        res.status(200).json({ message: 'Password reset link sent', resetLink });
    } catch (error) {
        console.error('Error requesting password reset:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    try {
        const { token, userId, newPassword } = req.body;

        // Find user by ID
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate reset token and check expiration
        const isTokenValid = await bcrypt.compare(token, user.resetToken);
        if (!isTokenValid || Date.now() > user.resetTokenExpiry) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear reset token
        await userService.updateUserPassword(user._id, hashedPassword);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password before updating
        const updatedUser = await userService.updateUser(userId, { name, email, password: hashedPassword });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    createUser,
    loginUser,
    requestPasswordReset, // For forgot password functionality
    resetPassword,        // For resetting the password
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
