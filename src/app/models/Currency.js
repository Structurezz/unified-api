// models/Currency.js
import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        maxlength: 3, // ISO 4217 currency code length
    },
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    exchangeRateToBase: {
        type: Number,
        required: true,
        default: 1, // This could be set to the exchange rate to a base currency (e.g., USD)
    },
    country: {
        type: String,
        required: true,
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

const Currency = mongoose.model('Currency', currencySchema);

export default Currency;
