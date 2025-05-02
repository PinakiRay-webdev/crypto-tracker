const favCoinsArray = JSON.parse(localStorage.getItem('favCoins'))?.coin || []

export const addToFav = (coinOBJ) =>{
    const coinData = {
        coinID : coinOBJ.id,
        coinName : coinOBJ.name,
        coinImage : coinOBJ.image,
        coinPrice : coinOBJ.current_price,
        coinRank : coinOBJ.market_cap_rank,
        coinSymbol : coinOBJ.symbol
    }

    const isPresent = favCoinsArray.some((coin) => coin.coinID === coinOBJ.id)

    if(!isPresent){
        favCoinsArray.push(coinData)
    }

    localStorage.setItem('favCoins' , JSON.stringify({
        coin : favCoinsArray
    }))

}