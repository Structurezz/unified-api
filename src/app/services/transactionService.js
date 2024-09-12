// services/transactionService.js
import BlockchainService from './blockchainService.js';
import Transaction from '../models/Transaction.js'; // Assume you have a Transaction model for database operations

class TransactionService {
    /**
     * Create a new transaction
     * @param {string} sender - The sender's identifier
     * @param {string} receiver - The receiver's identifier
     * @param {number} amount - The transaction amount
     * @param {string} currency - The currency type
     * @returns {Promise<Object>} - Returns the created transaction object
     */
    static async createTransaction(sender, receiver, amount, currency) {
        try {
            // 1. Create a transaction on the blockchain
            const blockchainTransaction = await BlockchainService.createTransaction(sender, receiver, amount, currency);
            
            // 2. Log the transaction in the database
            const newTransaction = new Transaction({
                transactionId: blockchainTransaction.transactionId,
                sender,
                receiver,
                amount,
                currency,
                status: blockchainTransaction.status,
                createdAt: new Date()
            });
            
            const savedTransaction = await newTransaction.save();
            
            return savedTransaction;
        } catch (error) {
            throw new Error('Error creating transaction: ' + error.message);
        }
    }

    /**
     * Get the status of a transaction
     * @param {string} transactionId - The transaction ID to check
     * @returns {Promise<Object>} - Returns the status of the transaction
     */
    static async getTransactionStatus(transactionId) {
        try {
            // 1. Fetch the status from the blockchain
            const blockchainStatus = await BlockchainService.getTransactionStatus(transactionId);

            // 2. Update the transaction status in the database if needed
            const transaction = await Transaction.findOne({ transactionId });
            if (transaction) {
                transaction.status = blockchainStatus.status;
                await transaction.save();
            }

            return blockchainStatus;
        } catch (error) {
            throw new Error('Error fetching transaction status: ' + error.message);
        }
    }

    /**
     * Get transaction history for a user
     * @param {string} userId - The user ID
     * @returns {Promise<Array>} - Returns an array of transaction objects
     */
    static async getTransactionHistory(userId) {
        try {
            const transactions = await Transaction.find({ $or: [{ sender: userId }, { receiver: userId }] });
            return transactions;
        } catch (error) {
            throw new Error('Error fetching transaction history: ' + error.message);
        }
    }
}

export default TransactionService;
