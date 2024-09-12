
import NotificationService from '../services/notificationService.js';

export const sendNotification = async (req, res) => {
    try {
        const { transactionId, userId } = req.body;
        const notification = await NotificationService.sendNotification(transactionId, userId);
        res.status(200).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
