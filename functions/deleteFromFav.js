export const removeFav = (coinID) => {
    let favCoins = JSON.parse(localStorage.getItem('favCoins'))?.coin || [];
    const unremovedCoin = favCoins.filter((coin) => coin.coinID !== coinID);
  
    localStorage.setItem('favCoins', JSON.stringify({
      coin: unremovedCoin
    }));
  };
  