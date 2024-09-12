
import axios from 'axios'; 

class CurrencyService {
    static async getExchangeRate(fromCurrency, toCurrency) {
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const rate = response.data.rates[toCurrency];
            return rate;
        } catch (error) {
            throw new Error('Error fetching exchange rate');
        }
    }

    static async convertCurrency(amount, fromCurrency, toCurrency) {
        try {
            const rate = await this.getExchangeRate(fromCurrency, toCurrency);
            const convertedAmount = amount * rate;
            return convertedAmount;
        } catch (error) {
            throw new Error('Error converting currency');
        }
    }
}

export default CurrencyService;
