import { removeFav } from "../../functions/deleteFromFav.js";

const renderWishlist = () => {
  const wishlists = document.querySelector("#wishlists");
  wishlists.innerHTML = ""
  const favCoins = JSON.parse(localStorage.getItem("favCoins")).coin;
  favCoins.forEach((coin) => {
    const list = `<section coin-id = "${coin.coinID}" class="flex gap-3 h-[8rem] shadow shadow-md rounded border border-zinc-300">
        <div class="bg-zinc-100 rounded-l px-4 py-2" >
          <img class="w-24" src="${coin.coinImage}" alt="">
        </div>
        <div class="relative w-full" >
          <h3 class="font-semibold text-xl text-teal-800" >${coin.coinName}</h3>
          <h4>${coin.coinSymbol}</h4>
          <h4>${coin.coinPrice}</h4>
          <header class="absolute top-2 right-2" >
              <button class="delete py-1 bg-red-500 px-2 text-white rounded cursor-pointer">
                  <i class="fa-solid fa-trash"></i>          
              </button>
                <button class="py-1 bg-green-500 px-2 text-white rounded cursor-pointer" >
                  <i class="fa-solid fa-circle-info"></i>          
              </button>
          </header>
        </div>
      </section>`;

    wishlists.insertAdjacentHTML("beforeend", list);
  });
  wishlists.querySelectorAll("section").forEach((coin) => {
    coin.addEventListener("click", (event) => {
      const coinID = coin.getAttribute("coin-id");
      const deleteBtn = event.target.closest(".delete");
      if (deleteBtn) {
        removeFav(coinID);
        renderWishlist()
      }
    });
  });
};

renderWishlist()




