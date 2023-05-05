const { maximiseProfits } = require('./maximiseProfits.performance');
const stockPrices = require('./stockPrices.json');

console.time();
maximiseProfits(stockPrices);
console.timeEnd();
