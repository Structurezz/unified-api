// models/Bank.js
import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema({
    bankId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    swiftCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'NGN', 'GBP'], // Example currencies
    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],
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

const Bank = mongoose.model('Bank', bankSchema);

export default Bank;
