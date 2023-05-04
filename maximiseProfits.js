const BigNumber = require('bignumber.js');

function maximiseProfits(stockPrices) {
  const stockStats = getStockStats(stockPrices);
  const mostProfitableStockStats = getMostProfitableStockStats(stockStats);

  return mostProfitableStockStats;
}

function getStockStats(stockPrices) {
  const stockStats = {};

  stockPrices.forEach((day, period) => {
    day.forEach((stock) => {
      const { name, price } = stock;

      const dayPrice = new BigNumber(price);

      if (stockStats.hasOwnProperty(name)) {
        const currentStats = stockStats[name];
        const { buy, sell } = currentStats;

        if (dayPrice.gt(sell.price) && period > buy.period) {
          currentStats.sell.price = dayPrice;
          currentStats.maxStockProfit = dayPrice.minus(buy.price);
        }

        if (dayPrice.lt(buy.price) && period < sell.period) {
          currentStats.buy = dayPrice;
          currentStats.maxStockProfit = sell.minus(dayPrice);
        }
      } else {
        stockStats[name] = {
          start: dayPrice,
          buy: { period, price: dayPrice },
          sell: { period, price: dayPrice },
          maxStockProfit: new BigNumber(0)
        };
      }
    });
  });
  return stockStats;
}

function getMostProfitableStockStats(stockStats) {
  const allStocks = Object.keys(stockStats);

  const mostProfitableStock = allStocks.reduce(
    ({ name, maxProfit }, currentStockName) => {
      const { maxStockProfit } = stockStats[currentStockName];

      if (maxStockProfit.gt(maxProfit)) {
        return { name: currentStockName, maxProfit: maxStockProfit };
      } else {
        return { name, maxProfit };
      }
    },
    {
      name: null,
      maxProfit: new BigNumber(0)
    }
  );
  const { name, maxProfit } = mostProfitableStock;
  return { name, maxProfit: maxProfit.toNumber() };
}

module.exports = {
  maximiseProfits,
  getStockStats,
  getMostProfitableStockStats
};
