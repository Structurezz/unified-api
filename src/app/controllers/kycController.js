
import KYCService from '../services/kycService.js';

export const verifyIdentity = async (req, res) => {
    try {
        const { userId, identityDetails } = req.body;
        const verificationStatus = await KYCService.verifyIdentity(userId, identityDetails);
        res.status(200).json({ success: true, verificationStatus });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
