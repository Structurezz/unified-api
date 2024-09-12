
import BankService from '../services/bankService.js';

export const initiateBankTransfer = async (req, res) => {
    try {
        const { senderAccount, receiverAccount, amount, currency } = req.body;
        const transferStatus = await BankService.initiateTransfer(senderAccount, receiverAccount, amount, currency);
        res.status(200).json({ success: true, transferStatus });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
