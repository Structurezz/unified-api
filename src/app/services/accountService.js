
import Account from '../models/Account.js';

const createAccount = async (userId, balance) => {
    try {
        const newAccount = new Account({
            userId,
            balance
        });
        await newAccount.save();
        return newAccount;
    } catch (error) {
        console.error('Error creating account:', error.message);
        throw new Error('Error creating account');
    }
};

const getAllAccounts = async () => {
    try {
        const accounts = await Account.find();
        return accounts;
    } catch (error) {
        console.error('Error fetching accounts:', error.message);
        throw new Error('Error fetching accounts');
    }
};

const getAccountById = async (accountId) => {
    try {
        const account = await Account.findById(accountId);
        return account;
    } catch (error) {
        console.error('Error fetching account:', error.message);
        throw new Error('Error fetching account');
    }
};

const updateAccount = async (accountId, balance) => {
    try {
        const updatedAccount = await Account.findByIdAndUpdate(
            accountId,
            { balance },
            { new: true }
        );
        return updatedAccount;
    } catch (error) {
        console.error('Error updating account:', error.message);
        throw new Error('Error updating account');
    }
};

const deleteAccount = async (accountId) => {
    try {
        const deletedAccount = await Account.findByIdAndDelete(accountId);
        return deletedAccount;
    } catch (error) {
        console.error('Error deleting account:', error.message);
        throw new Error('Error deleting account');
    }
};

export default {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
};
