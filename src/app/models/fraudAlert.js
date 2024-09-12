// models/FraudAlert.js
import mongoose from 'mongoose';

const fraudAlertSchema = new mongoose.Schema({
    alertId: {
        type: String,
        required: true,
        unique: true,
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'reviewed', 'resolved'],
        default: 'pending',
    },
    detectedAt: {
        type: Date,
        default: Date.now,
    },
    resolvedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

const FraudAlert = mongoose.model('FraudAlert', fraudAlertSchema);

export default FraudAlert;
