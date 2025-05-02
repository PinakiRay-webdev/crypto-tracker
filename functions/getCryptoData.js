const base_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

export const getCoins = async () =>{
    try {
        const response = await fetch(base_url);
        if(!response.ok){
            throw new Error('unable to fetch data!! try refreshing the page');
        }
        const coins = await response.json();
        return coins;
    } catch (error) {
        console.error(error.message);
    }
}
