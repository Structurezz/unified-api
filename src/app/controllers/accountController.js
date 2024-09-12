// controllers/accountController.js
import accountService from '../services/accountService.js';

// Create a new account
const createAccount = async (req, res) => {
    try {
        const { userId, balance } = req.body;
        const newAccount = await accountService.createAccount(userId, balance);
        res.status(201).json(newAccount);
    } catch (error) {
        console.error('Error creating account:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all accounts
const getAllAccounts = async (req, res) => {
    try {
        const accounts = await accountService.getAllAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a specific account by ID
const getAccountById = async (req, res) => {
    try {
        const { accountId } = req.params;
        const account = await accountService.getAccountById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        console.error('Error fetching account:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an account by ID
const updateAccount = async (req, res) => {
    try {
        const { accountId } = req.params;
        const { balance } = req.body;
        const updatedAccount = await accountService.updateAccount(accountId, balance);
        if (!updatedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(updatedAccount);
    } catch (error) {
        console.error('Error updating account:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an account by ID
const deleteAccount = async (req, res) => {
    try {
        const { accountId } = req.params;
        const deletedAccount = await accountService.deleteAccount(accountId);
        if (!deletedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
};
