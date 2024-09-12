
import CurrencyService from '../services/currencyService.js';

export const getExchangeRate = async (req, res) => {
    try {
        const { fromCurrency, toCurrency } = req.query;
        const rate = await CurrencyService.getExchangeRate(fromCurrency, toCurrency);
        res.status(200).json({ success: true, rate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const convertCurrency = async (req, res) => {
    try {
        const { amount, fromCurrency, toCurrency } = req.body;
        const convertedAmount = await CurrencyService.convertCurrency(amount, fromCurrency, toCurrency);
        res.status(200).json({ success: true, convertedAmount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
