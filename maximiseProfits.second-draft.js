const BigNumber = require('bignumber.js');

function maximiseProfits(stockPrices) {
  const stockTrends = getStockTrends(stockPrices);
  return getMostProfitable(stockTrends);
}

function getStockTrends(stockPrices) {
  return stockPrices.reduce((cumulativeStockTrends, day) => {
    const trends = { ...cumulativeStockTrends };
    day.forEach(({ name, price }) => {
      if (trends.hasOwnProperty(name)) {
        trends[name].push(price);
      } else {
        trends[name] = [price];
      }
    });
    return trends;
  }, {});
}

function getMostProfitable(stockTrends) {
  const mostProfitableStock = {
    name: '',
    maxProfit: 0
  };

  for (stock in stockTrends) {
    const trend = stockTrends[stock];
    const thisMaxProfit = trend.reduce(getMaxProfit, 0);
    if (thisMaxProfit.gt(mostProfitableStock.maxProfit)) {
      mostProfitableStock.name = stock;
      mostProfitableStock.maxProfit = thisMaxProfit.toNumber();
    }
  }
  return mostProfitableStock;
}

const getMaxProfit = (maxProfit, price, period, trend) => {
  const thisPrice = new BigNumber(price);
  const projectedPrices = trend.slice(period);
  const peakProjected = BigNumber.maximum(...projectedPrices);
  const maxPotentialProfit = peakProjected.minus(thisPrice);

  if (maxPotentialProfit.gt(maxProfit)) {
    maxProfit = maxPotentialProfit;
  }
  return new BigNumber(maxProfit);
};

module.exports = {
  maximiseProfits
};
