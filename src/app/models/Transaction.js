
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'NGN', 'GBP', 'BTC', 'ETH'], // Example currencies, adjust as needed
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'success', 'failed'], // Transaction status options
        default: 'pending',
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
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Pre-save hook to update the updatedAt field
transactionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
