
import FraudDetectionService from '../services/fraudDetectionService.js';

export const checkFraud = async (req, res) => {
    try {
        const { transactionDetails } = req.body;
        const isFraud = await FraudDetectionService.checkFraud(transactionDetails);
        res.status(200).json({ success: true, isFraud });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
