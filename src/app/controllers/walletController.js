
import WalletService from '../services/walletService.js';

export const processWalletPayment = async (req, res) => {
    try {
        const { walletId, amount, currency } = req.body;
        const paymentStatus = await WalletService.processPayment(walletId, amount, currency);
        res.status(200).json({ success: true, paymentStatus });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
