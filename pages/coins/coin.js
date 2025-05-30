import { getCoinById } from "../../functions/getCoinByID.js";
import { minimizePrice } from "../../functions/PriceShort.js";
import { longDate } from "../../functions/formatDate.js";
import { getHistoricalData } from "../../functions/getHistoricalData.js";

const currentURL = new URLSearchParams(window.location.search);
const coinID = currentURL.get("id");

const leftSection = document.querySelector("#left");
const pricePerformance = document.querySelector("#price_performance");
const coinDesc = document.querySelector("#coin-desc");
const expandDescBtn = document.querySelector("#expandDescBtn");
const coinChart = document.querySelector("#coinChart").getContext("2d");

let descTextSize = 350;

const checkPositivity = (num) => {
  return num >= 0 ? true : false;
};

getCoinById(coinID).then(async (coin) => {
  const coinData = `<article >
                    <div class="flex gap-3 items-start">                    
                    <img class="w-10" src="${
                      coin.image.small
                    }" alt="image of coin">
                    <h2 class="font-semibold text-white text-xl">${
                      coin.name
                    }</h2>
                    <p class="font-thin text-gray-200" >${coin.symbol.toUpperCase()}</p>
                    <span class="bg-gray-600 border border-white text-white px-3 rounded-lg text-xs" >#${
                      coin.market_cap_rank
                    }</span>
                    </div>
                <div class="rounded py-2 px-3 flex items-center gap-4" >
                    <p class="text-white text-5xl font-semibold" >$${
                      coin.market_data.current_price.usd
                    }</p>
                    <p class="${
                      checkPositivity(
                        coin.market_data.price_change_percentage_24h
                      )
                        ? "text-green-500"
                        : "text-red-500"
                    }">${coin.market_data.price_change_percentage_24h.toFixed(
    3
  )}% (1d)</p>
                </div>
            </article>

        <article id="coin-data" class="grid grid-cols-2 gap-3 text-zinc-500 mt-8" >
        <fieldset class="border border-zinc-700 rounded py-1 px-3" >
            <legend class="px-2 text-sm font-semibold" >Market cap</legend>
            <p class="text-center flex items-center justify-center gap-3" >$${minimizePrice(
              parseInt(coin.market_data.market_cap.usd)
            )} <span class="text-xs font-semibold  ${
    checkPositivity(coin.market_data.price_change_percentage_24h)
      ? "text-green-500"
      : "text-red-500"
  }"" >${coin.market_data.market_cap_change_percentage_24h.toFixed(
    2
  )} %</span> </p>
        </fieldset>
        <fieldset class="border border-zinc-700 rounded py-1 px-3" >
            <legend class="px-2 text-sm font-semibold" >Total Volume</legend>
            <p class="text-center" >$${minimizePrice(
              parseInt(coin.market_data.total_volume.usd)
            )}</p>
        </fieldset>
        <fieldset class="border border-zinc-700 rounded py-1 px-3" >
            <legend class="px-2 text-sm font-semibold" >FDV</legend>
            <p class="text-center" >$${minimizePrice(
              parseInt(coin.market_data.fully_diluted_valuation.usd)
            )}</p>
        </fieldset>
        <fieldset class="border border-zinc-700 rounded py-1 px-3" >
            <legend class="px-2 text-sm font-semibold" >Vol/Mkt Cap</legend>
            <p class="text-center" >5858449</p>
        </fieldset>
        <fieldset class="border border-zinc-700 rounded py-1 px-3" >
            <legend class="px-2 text-sm font-semibold" >Total Supply</legend>
            <p class="text-center" >${minimizePrice(
              parseInt(coin.market_data.total_supply)
            )} ${coin.symbol.toUpperCase()}</p>
        </fieldset>
        <fieldset class="border border-zinc-700 rounded py-1 px-3" >
            <legend class="px-2 text-sm font-semibold" >Max. Supply</legend>
            <p class="text-center" >${minimizePrice(
              parseInt(coin.market_data.max_supply)
            )} ${coin.symbol.toUpperCase()}</p>
        </fieldset>
        <fieldset class="border border-zinc-700 rounded py-1 px-3 col-span-2" >
            <legend class="px-2 text-sm font-semibold" >Circulating Supply</legend>
            <p class="text-center" >${minimizePrice(
              parseInt(coin.market_data.circulating_supply)
            )} ${coin.symbol.toUpperCase()}</p>
        </fieldset>
    </article>`;

  const price_brief = `<header id="price-brief-data" class="font-semibold text-white" >
                    Price Performance
                </header>
                <article class="mt-3 text-sm" >
                    <div id="low_and_high" class="text-slate-500 flex justify-between" >
                        <div>
                            <p>Low</p>
                            <p class="text-white" >$${
                              coin.market_data.low_24h.usd
                            }</p>
                        </div>
                        <div>
                            <p>High</p>
                            <p class="text-white" >$${
                              coin.market_data.high_24h.usd
                            }</p>
                        </div>
                    </div>
                    <div id="ath_and_atl" class="text-slate-500 my-3" >
                        <div class="flex justify-between mt-2" >
                            <p>All time high</p>
                            <p class="text-white" >$${
                              coin.market_data.ath.usd
                            }</p>
                        </div>
                        <div class="flex justify-between mt-2" >
                            <p class="font-semibold text-slate-400" >${longDate(
                              coin.market_data.ath_date.usd
                            )}</p>
                            <p class="${
                              checkPositivity(
                                coin.market_data.ath_change_percentage.usd
                              )
                                ? "text-green-500"
                                : "text-red-500"
                            }" >${coin.market_data.ath_change_percentage.usd.toFixed(
    2
  )} %</p>
                        </div>
                        <div class="flex justify-between mt-2" >
                            <p>all time low</p>
                            <p class="text-white" >$${
                              coin.market_data.atl.usd
                            }</p>
                        </div>
                        <div class="flex justify-between mt-2" >
                            <p class="font-semibold text-slate-400" >${longDate(
                              coin.market_data.atl_date.usd
                            )}</p>
                            <p class="${
                              checkPositivity(
                                coin.market_data.atl_change_percentage.usd
                              )
                                ? "text-green-500"
                                : "text-red-500"
                            }" >${coin.market_data.atl_change_percentage.usd.toFixed(
    2
  )} %</p>
                        </div>
                    </div>
                </article>`;

  leftSection.insertAdjacentHTML("beforeend", coinData);
  pricePerformance.insertAdjacentHTML("beforeend", price_brief);
  coinDesc.textContent =
    `${coin.description.en}`.slice(0, descTextSize) + "........";

  expandDescBtn.addEventListener("click", () => {
    if (expandDescBtn.textContent === "See More") {
      descTextSize = Infinity;
      coinDesc.textContent = `${coin.description.en}`.slice(0, descTextSize);
      expandDescBtn.textContent = "See less";
    } else {
      descTextSize = 350;
      coinDesc.textContent =
        `${coin.description.en}`.slice(0, descTextSize) + "........";
      expandDescBtn.textContent = "See More";
    }
  });

  // Fetch historical data
  const historicalData = await getHistoricalData(coinID, 1);
  const labels = historicalData.map(([timestamp]) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });
  const data = historicalData.map(([_, price]) => price);

  //gradient color

  const gradient = coinChart.createLinearGradient(0, 0, 0, 400);
  let borderColor;
  if(checkPositivity(coin.market_data.price_change_percentage_24h)){
    gradient.addColorStop(0, "rgba(20, 252, 8, 0.5)");
    gradient.addColorStop(1, "rgba(41, 161, 79, 0)");
    borderColor = "rgba(20, 252, 8, 1)"
  }else{
    gradient.addColorStop(0, "rgba(255, 69, 0, 0.5)");
    gradient.addColorStop(1, "rgba(139, 48, 48, 0)");
    borderColor = "rgba(255, 69, 0, 1)"
  }


  // Chart logic
  const crytoChart = new Chart(coinChart, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Price (USD)",
          borderColor: borderColor,
          backgroundColor: gradient,
          data: data,
          fill: true,
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: "Price (USD)" },
          ticks: {
            callback: function (value) {
              return `$${value}`;
            },
          },
        },
        x: {
          grid: { display: false },
          title: { display: true, text: "Date" },
        },
      },
      responsive: true,
      maintainAspectRatio: true,
    },
  });
});
