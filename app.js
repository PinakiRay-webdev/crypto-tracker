import { getCoins } from "./functions/getCryptoData.js";
import { addToFav } from "./functions/addToFav.js";
const tableBody = document.querySelector("#table-body");

getCoins().then((coins) => {
  coins.forEach((coin, index) => {
    const tableRow = `<tr coin-id="${
      coin.id
    }" class="cursor-pointer hover:bg-zinc-200" >
    <td class="border border-collapse border-gray-400 text-sm text-gray-800 py-2">${++index}</td>
    <td class="border border-collapse border-gray-400 text-sm text-gray-800 py-2">
      <img class="w-7 mx-auto" src="${coin.image}" alt="${coin.name}" />
    </td>
    <td class="border border-collapse border-gray-400 text-sm text-gray-800 py-2">${
      coin.name
    }</td>
    <td class="border border-collapse border-gray-400 text-sm text-gray-800 py-2">${
      coin.current_price
    }</td>
    <td class="border border-collapse border-gray-400 text-sm text-gray-800 py-2">${
      coin.total_volume
    }</td>
    <td class="border border-collapse border-gray-400 text-sm text-gray-800 py-2">${
      coin.market_cap
    }</td>
    <td class="favourites border border-collapse border-gray-400 text-sm text-gray-800 py-2">
      <i class="fa-solid fa-heart"></i>
    </td>
  </tr>`;
    tableBody.insertAdjacentHTML('beforeend' , tableRow)
  });

  tableBody.querySelectorAll('tr').forEach((row) =>{
    row.addEventListener('click' , (event) =>{
      const coinID = row.getAttribute('coin-id');
      const favBtn = event.target.closest('.favourites');
      if(favBtn){
        const selectedCoin = coins.find((ele) => ele.id === coinID)
        addToFav(selectedCoin)
        alert(`${coinID} is added to your wishlist`)
      }else{
        window.location.href = `/pages/coins/coin.html?id=${coinID}`
      }
    })
  })
});

