const base_url = 'https://api.coingecko.com/api/v3/coins';

export const getHistoricalData = async (coinid, days) => {
    try {
        const response = await fetch(`${base_url}/${coinid}/market_chart?vs_currency=usd&days=${days}`);
        if (!response.ok) {
            throw new Error('Unable to fetch historical data');
        }
        const data = await response.json();
        return data.prices; // Returns an array of [timestamp, price]
    } catch (error) {
        console.error(error.message);
    }
};