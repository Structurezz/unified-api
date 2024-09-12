
import BlockchainService from '../services/blockchainService.js';

export const createTransaction = async (req, res) => {
    try {
        const { sender, receiver, amount, currency } = req.body;
        const transaction = await BlockchainService.createTransaction(sender, receiver, amount, currency);
        res.status(201).json({ success: true, transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTransactionStatus = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const status = await BlockchainService.getTransactionStatus(transactionId);
        res.status(200).json({ success: true, status });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
