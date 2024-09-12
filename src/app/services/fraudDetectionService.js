

class FraudDetectionService {
    static async checkFraud(transactionDetails) {
        try {
            // Simple rule-based fraud detection logic
            const { amount, location } = transactionDetails;
            if (amount > 10000 && location === 'suspicious_location') {
                return true; // Flag as potential fraud
            }
            // More complex ML-based checks can be added here
            return false;
        } catch (error) {
            throw new Error('Error checking for fraud');
        }
    }
}

export default FraudDetectionService;
