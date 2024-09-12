import User from '../models/User.js';

// Create a new user
export const createUser = async (name, email, password, phone) => {
    const newUser = new User({ name, email, password, phone });
    return newUser.save();
};

// Get user by email
export const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

// Get a user by ID
export const getUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};

// Update a user by ID
export const updateUser = async (userId, updateData) => {
    try {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

// Save password reset token and expiry
export const savePasswordResetToken = async (userId, resetTokenHash, tokenExpiry) => {
    try {
        return await User.findByIdAndUpdate(userId, {
            resetToken: resetTokenHash,
            resetTokenExpiry: tokenExpiry
        }, { new: true });
    } catch (error) {
        throw new Error(`Error saving password reset token: ${error.message}`);
    }
};

// Update user password
export const updateUserPassword = async (userId, newPassword) => {
    try {
        return await User.findByIdAndUpdate(userId, { password: newPassword }, { new: true });
    } catch (error) {
        throw new Error(`Error updating user password: ${error.message}`);
    }
};
