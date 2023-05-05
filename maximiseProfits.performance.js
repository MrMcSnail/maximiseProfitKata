const BigNumber = require('bignumber.js');

function maximiseProfits(stockPrices) {
  return getMostProfitable(
    stockPrices.reduce((cumulativeStockTrends, day) => {
      const trends = { ...cumulativeStockTrends };
      day.forEach(({ name, price }) => {
        if (trends.hasOwnProperty(name)) {
          trends[name].push(price);
        } else {
          trends[name] = [price];
        }
      });
      return trends;
    }, {})
  );
}

function getMostProfitable(stockTrends) {
  const mostProfitableStock = {
    name: '',
    maxProfit: 0
  };

  const stocks = Object.keys(stockTrends);

  for (let i = 0; i < stocks.length; i++) {
    const thisMaxProfit = stockTrends[stocks[i]].reduce(
      (maxProfit, price, period, trend) => {
        const maxPotentialProfit = BigNumber.maximum(
          ...trend.slice(period)
        ).minus(price);

        if (maxPotentialProfit.gt(maxProfit)) {
          maxProfit = maxPotentialProfit;
        }
        return new BigNumber(maxProfit);
      },
      0
    );
    if (thisMaxProfit.gt(mostProfitableStock.maxProfit)) {
      mostProfitableStock.name = stocks[i];
      mostProfitableStock.maxProfit = thisMaxProfit.toNumber();
    }
  }
  return mostProfitableStock;
}

module.exports = {
  maximiseProfits
};
