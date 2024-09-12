// models/Wallet.js
import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'NGN', 'GBP', 'BTC', 'ETH'], // Example currencies
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

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
