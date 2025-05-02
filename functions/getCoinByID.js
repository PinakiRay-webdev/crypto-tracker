const base_url = 'https://api.coingecko.com/api/v3/coins'
export const getCoinById = async (coinid) =>{
    try {
        const response = await fetch(`${base_url}/${coinid}`)
        if(!response.ok){
            throw new Error('unable to fetch the data')
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error.message);
    }
}
