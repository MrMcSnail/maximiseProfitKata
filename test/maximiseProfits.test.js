// functions being tested
const {
  maximiseProfits,
  getStockStats,
  getMostProfitableStockStats
} = require('../maximiseProfits');

// test frameworks
const { expect } = require('chai');
const { default: BigNumber } = require('bignumber.js');
const should = require('chai').should();

describe('maximiseProfits()', () => {
  context(
    'When passed a nested array (period) of arrays (days) containing stock objects (prices)',
    () => {
      it('should return a single object with name:String and maxProfit:Number.', () => {
        const stockPrices = [
          [
            {
              name: 'Apple',
              price: 120.25
            },
            {
              name: 'Microsoft',
              price: 240.5
            },
            {
              name: 'Tesla',
              price: 680.75
            },
            {
              name: 'Amazon',
              price: 3100.25
            },
            {
              name: 'Google',
              price: 2000.5
            }
          ],
          [
            {
              name: 'Apple',
              price: 125.58
            },
            {
              name: 'Microsoft',
              price: 248.72
            },
            {
              name: 'Tesla',
              price: 682.78
            },
            {
              name: 'Amazon',
              price: 3102.64
            },
            {
              name: 'Google',
              price: 1997.77
            }
          ]
        ];
        const mostProfitableStock = maximiseProfits(stockPrices);

        mostProfitableStock.should.be
          .an('object')
          .and.have.property('name')
          .that.is.a('string');

        mostProfitableStock.should.have
          .property('maxProfit')
          .which.is.a('number');
      });
    }
  );
  context(
    'When passed a two days worth of data on one stock which increases in value',
    () => {
      it('should return the profit of buying on day one and selling on day two.', () => {
        const stock = [
          [
            {
              name: 'Apple',
              price: 120.0
            }
          ],
          [
            {
              name: 'Apple',
              price: 125.0
            }
          ]
        ];
        const profit = maximiseProfits(stock);

        profit.should.eql({ name: 'Apple', maxProfit: 5 });
      });
    }
  );
  context('when passed many days of data from many stocks', () => {
    it('will find the best investment and return a single object with the stock name and maxProfit that can be made by buying and selling that stock', () => {
      const stocks = [
        // Day 1
        [
          { name: 'Apple', price: 120.25 },
          { name: 'Microsoft', price: 240.5 },
          { name: 'Tesla', price: 680.75 },
          { name: 'Amazon', price: 3100.25 },
          { name: 'Google', price: 2000.5 }
        ],
        // Day 2
        [
          { name: 'Apple', price: 122.5 },
          { name: 'Microsoft', price: 238.75 },
          { name: 'Tesla', price: 675.25 },
          { name: 'Amazon', price: 3125.25 },
          { name: 'Google', price: 2010.75 }
        ],
        // Day 3
        [
          { name: 'Apple', price: 119.75 },
          { name: 'Microsoft', price: 243.25 },
          { name: 'Tesla', price: 690.5 },
          { name: 'Amazon', price: 3085.5 },
          { name: 'Google', price: 2005.25 }
        ],
        // Day 4
        [
          { name: 'Apple', price: 118.25 },
          { name: 'Microsoft', price: 239.5 },
          { name: 'Tesla', price: 685.25 },
          { name: 'Amazon', price: 3130.75 },
          { name: 'Google', price: 2025.5 }
        ],
        // Day 5
        [
          { name: 'Apple', price: 121.75 },
          { name: 'Microsoft', price: 242 },
          { name: 'Tesla', price: 700.75 },
          { name: 'Amazon', price: 3125.25 },
          { name: 'Google', price: 2030.25 }
        ],
        // Day 6
        [
          { name: 'Apple', price: 119 },
          { name: 'Microsoft', price: 237.25 },
          { name: 'Tesla', price: 695.25 },
          { name: 'Amazon', price: 3080 },
          { name: 'Google', price: 2050.5 }
        ],
        // Day 7
        [
          { name: 'Apple', price: 121.5 },
          { name: 'Microsoft', price: 239 },
          { name: 'Tesla', price: 710.5 },
          { name: 'Amazon', price: 3130.75 },
          { name: 'Google', price: 2055.25 }
        ],
        // Day 8
        [
          { name: 'Apple', price: 118.75 },
          { name: 'Microsoft', price: 244 },
          { name: 'Tesla', price: 705.25 },
          { name: 'Amazon', price: 3085.5 },
          { name: 'Google', price: 2075.5 }
        ],
        // Day 9
        [
          { name: 'Apple', price: 117.25 },
          { name: 'Microsoft', price: 240.25 },
          { name: 'Tesla', price: 700 },
          { name: 'Amazon', price: 3120.25 },
          { name: 'Google', price: 2080.25 }
        ],
        // Day 10
        [
          { name: 'Apple', price: 117.25 },
          { name: 'Microsoft', price: 240.25 },
          { name: 'Tesla', price: 700 },
          { name: 'Amazon', price: 3120.25 },
          { name: 'Google', price: 2110.75 }
        ],
        // Day 11
        [
          { name: 'Apple', price: 119.75 },
          { name: 'Microsoft', price: 242.75 },
          { name: 'Tesla', price: 695.25 },
          { name: 'Amazon', price: 3085.5 },
          { name: 'Google', price: 2085.5 }
        ],
        // Day 12
        [
          { name: 'Apple', price: 122.5 },
          { name: 'Microsoft', price: 238.5 },
          { name: 'Tesla', price: 705.25 },
          { name: 'Amazon', price: 3125.25 },
          { name: 'Google', price: 2070.25 }
        ],
        // Day 13
        [
          { name: 'Apple', price: 121 },
          { name: 'Microsoft', price: 243 },
          { name: 'Tesla', price: 690 },
          { name: 'Amazon', price: 3080 },
          { name: 'Google', price: 2055.25 }
        ],
        // Day 14
        [
          { name: 'Apple', price: 118.25 },
          { name: 'Microsoft', price: 239 },
          { name: 'Tesla', price: 695.75 },
          { name: 'Amazon', price: 3105.75 },
          { name: 'Google', price: 2040 }
        ],
        // Day 15
        [
          { name: 'Apple', price: 120.75 },
          { name: 'Microsoft', price: 241.25 },
          { name: 'Tesla', price: 680.5 },
          { name: 'Amazon', price: 3135 },
          { name: 'Google', price: 2030.75 }
        ]
      ];

      const bestInvestment = maximiseProfits(stocks);

      bestInvestment.name.should.equal('Google');
      bestInvestment.maxProfit.should.equal(110.25);
    });
  });
});

describe('getStockStats', () => {
  context(
    'When passed any nested array (period) of arrays (days) containing stock objects (prices)',
    () => {
      it('should return an object containing keys for each of the stocks featured in the period ', () => {
        const stockPrices = [
          [
            {
              name: 'Apple',
              price: 120.25
            },
            {
              name: 'Microsoft',
              price: 240.5
            },
            {
              name: 'Tesla',
              price: 680.75
            },
            {
              name: 'Amazon',
              price: 3100.25
            },
            {
              name: 'Google',
              price: 2000.5
            }
          ]
        ];

        const stockStats = getStockStats(stockPrices);

        stockStats.should.be
          .a('object')
          .which.has.all.keys(
            'Apple',
            'Microsoft',
            'Tesla',
            'Amazon',
            'Google'
          );
      });
    }
  );
  context(
    'When passed a two days worth of data on one stock which increases in value',
    () => {
      it('should return an object whose values are stats of the stocks over the period, including:\n\tstart:BigNumber\n\tpeak:BigNumber\n\tmaxProfit:BigNumber', () => {
        const stockPrices = [
          [{ name: 'Apple', price: 120.0 }],
          [{ name: 'Apple', price: 125.0 }]
        ];

        const stockStats = getStockStats(stockPrices);

        stockStats.should.have
          .property('Apple')
          .which.has.all.keys('start', 'buy', 'sell', 'maxStockProfit');

        const { buy, sell, maxStockProfit } = stockStats.Apple;

        buy.should.be.instanceof(BigNumber);
        sell.should.be.instanceof(BigNumber);
        maxStockProfit.should.be.instanceof(BigNumber);

        buy.toNumber().should.equal(120.0);
        sell.toNumber().should.equal(125.0);
        maxStockProfit.toNumber().should.equal(5);
      });
    }
  );
  context('When passed a two days worth of data on more than one stock', () => {
    it('should return an object whose values are stats of the stocks over the period, including:\n\tstart:BigNumber\n\tpeak:BigNumber\n\tmaxStockProfit:BigNumber', () => {
      const stockPrices = [
        [
          {
            name: 'Apple',
            price: 120.25
          },
          {
            name: 'Tesla',
            price: 680.75
          },
          {
            name: 'Google',
            price: 2000.5
          }
        ],
        [
          {
            name: 'Apple',
            price: 125.58
          },
          {
            name: 'Tesla',
            price: 682.78
          },
          {
            name: 'Google',
            price: 1997.77
          }
        ]
      ];

      const stockStats = getStockStats(stockPrices);

      stockStats.should.have.all.keys('Apple', 'Tesla', 'Google');

      const { Apple, Tesla, Google } = stockStats;

      Apple.buy.toNumber().should.equal(120.25);
      Apple.sell.toNumber().should.equal(125.58);
      Apple.maxStockProfit.toNumber().should.equal(5.33);

      Tesla.buy.toNumber().should.equal(680.75);
      Tesla.sell.toNumber().should.equal(682.78);
      Tesla.maxStockProfit.toNumber().should.equal(2.03);

      Google.buy.toNumber().should.equal(2000.5);
      Google.sell.toNumber().should.equal(2000.5);
      Google.maxStockProfit.toNumber().should.equal(0);
    });
  });
});

describe('getMostProfitableStockStats', () => {
  context('when given stock stats of only one stock', () => {
    it('should return an object containing the name of the stock and its maxProfit', () => {
      const stockStats = {
        Apple: {
          buy: new BigNumber(20),
          sell: new BigNumber(30),
          maxStockProfit: new BigNumber(10)
        }
      };

      const mostProfitableStockStats = getMostProfitableStockStats(stockStats);
      mostProfitableStockStats.should.eql({
        name: 'Apple',
        maxProfit: 10
      });
    });
  });
  context('when given stock stats of more than one stock', () => {
    it('should return an array containing the name of the most profitable stock and its stats object', () => {
      const stockStats = {
        Apple: {
          buy: new BigNumber(20),
          sell: new BigNumber(30),
          maxStockProfit: new BigNumber(10)
        },
        eBay: {
          buy: new BigNumber(202.0),
          sell: new BigNumber(301.74),
          maxStockProfit: new BigNumber(99.74)
        }
      };

      const mostProfitableStockStats = getMostProfitableStockStats(stockStats);
      mostProfitableStockStats.should.eql({
        name: 'eBay',
        maxProfit: 99.74
      });
    });
  });
});
