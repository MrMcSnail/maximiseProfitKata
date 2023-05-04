const { maximiseProfits } = require('./maximiseProfits.second-draft');
const stockPrices = require('./stockPrices.json');

console.time();
maximiseProfits(stockPrices);
console.timeEnd();
