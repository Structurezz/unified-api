
import axios from 'axios'; 

class NotificationService {
    static async sendNotification(transactionId, userId) {
        try {
            // Simulate sending a notification
            // Replace with actual notification service integration
            const notificationResponse = await axios.post('https://notification-service.com/send', {
                transactionId,
                userId,
                message: 'Your transaction was completed successfully!'
            });
            return notificationResponse.data;
        } catch (error) {
            throw new Error('Error sending notification');
        }
    }
}

export default NotificationService;
