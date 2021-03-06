/* eslint-disable dot-notation */
/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import { Stock } from './Stock.js';
import * as util from '../common/util.js';

// const startTime = Date.now();
// console.log('Executed QUEURY in', Date.now() - startTime, 'ms');

// console.log(JSON.stringify(`fetchWebApiStock response data: ${item}`)),
//   console.log(`typeof item: ${typeof item}`);

const searchWebApi = async url => {
  try {
    const data = await util.getWithRetry(url);

    const symbolData = data.bestMatches.map(item => ({
      label: item['1. symbol'],
      value: item['9. matchScore'],
    }));

    console.log(symbolData);
    return symbolData;
  } catch (ex) {
    console.log(`searchWebApi error: ${ex}`);
  }
};

// function timeConverter(unixTimestamp) {
//   const a = new Date(unixTimestamp);
//   // console.log('a:', a);
//   const year = a.getFullYear();
//   let month = a.getMonth();
//   let date = a.getDate();

//   if (month < 10) {
//     month = `0${month}`;
//   }

//   if (date < 10) {
//     date = `0${date}`;
//   }

//   const time = `${year}-${month}-${date}`;
//   return time;
// }

function timeConverter(unixTimestamp) {
  const time = unixTimestamp / 1000;
  return time;
}

const fetchWebApiStock = async url => {
  try {
    const data = await util.getWithRetry(url);

    const result = Object.entries(data['Time Series (Daily)']).map(
      ([date, dateObj]) => ({
        time: timeConverter(Date.parse(date)),
        open: Math.round(parseFloat(dateObj['1. open']) * 100) / 100,
        high: Math.round(parseFloat(dateObj['2. high']) * 100) / 100,
        low: Math.round(parseFloat(dateObj['3. low']) * 100) / 100,
        close: Math.round(parseFloat(dateObj['4. close']) * 100) / 100,
        // volume: parseInt(dateObj['5. volume']),
        // parseInt vs unary plus  +dateObj["5. volume"]
      })
    );

    // const result = data.map(item => ({
    //   date: Date.parse(item.date),
    //   open: item.open,
    //   high: item.high,
    //   low: item.low,
    //   close: item.close,
    //   volume: item.volume,
    // }));

    return result;
  } catch (err) {
    console.log('fetchWebApiStock error: ', err);
  }
};

const createUpdateStock = async (symbol, webApiData) => {
  try {
    // console.log('creatStock symbol', symbol);
    // console.log('creatStock webApiData', JSON.stringify(webApiData));

    const webApiDataReversed = webApiData.reverse();
    const query = { symbol };

    const position = await Stock.findOne(query);

    // console.log('position', position);

    if (!position) {
      // console.log('New stock');
      return Stock.create({
        symbol,
        data: webApiDataReversed,
      });
    }
    await Stock.bulkWrite([
      {
        updateOne: {
          // updateOne() allows for updating fields vs replaceOne() you can only replace the entire document
          // https://stackoverflow.com/questions/35848688/whats-the-difference-between-replaceone-and-updateone-in-mongodb
          filter: query,
          update: { $pop: { data: 1 } },
        },
      },
      {
        updateOne: {
          filter: query,
          update: {
            $addToSet: {
              data: webApiDataReversed,
            },
          },
        },
      },
    ]);

    const positionTwo = await Stock.findOne(query);
    // need this one to trigger pre('save') hooks
    await positionTwo.save();
    // await position.save();
  } catch (ex) {
    // console.log('creatUpdateStock error: ', ex);
    console.log('creatUpdateStock error: ', ex);
  }
};

const fetchDb = async symbol => {
  try {
    const query = { symbol: symbol };
    const projection = { _id: 0, data: 1 };

    const chartData = await Stock.findOne(query, projection).sort({ date: -1 });
    // console.log(`chartData in services:${JSON.stringify(chartData)}`);
    return chartData.data.map(item => ({
      date: parseFloat(item.date),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume),
    }));
  } catch (ex) {
    console.log(`fetchDb error: ${ex}`);
  }
};

const dbSearchApi = async curValueDbSearch => {
  try {
    const queryRegex = `^${curValueDbSearch}`;
    const query = {
      symbol: { $regex: queryRegex, $options: 'i' },
    }; // Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
    const searchBoxData = await Stock.find(query).limit(10);
    return searchBoxData.map(item => ({
      symbol: item.symbol,
    }));
  } catch (ex) {
    console.log(`dbSearchApi error: ${ex}`);
  }
};

const generateUrlArrayStock = async () => {
  try {
    const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const query = {};
    const projection = { _id: 0, symbol: 1 };
    const dataFromDB = await Stock.find(query, projection);

    return dataFromDB.map(item => ({
      url: `https://sandbox.iexapis.com/stable/stock/${item.symbol}/chart?token=${apiKey}`,
      symbol: item.symbol,
    }));

    //   {
    //   // if (!item.symbol === '[null]') return;
    //   console.log(JSON.stringify(`list of symbols: ${item.symbol}`));
    //   console.log(
    //     JSON.stringify(`list of symbols typeof: ${typeof item.symbol}`)
    //   );
    // });
  } catch (ex) {
    console.log(`generateUrlArrayList error: ${ex}`);
  }
};

const generateUrlArrayStockChart = async () => {
  try {
    const apiKeyAlpha = process.env.API_KEY_ALPHAVANTAGE;

    const query = {};
    const projection = { _id: 0, symbol: 1 };
    const dataFromDB = await Stock.find(query, projection);

    return dataFromDB.map(item => ({
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${item.symbol}&outputsize=compact&apikey=${apiKeyAlpha}`,
      symbol: item.symbol,
    }));

    //   {
    //   // if (!item.symbol === '[null]') return;
    //   console.log(JSON.stringify(`list of symbols: ${item.symbol}`));
    //   console.log(
    //     JSON.stringify(`list of symbols typeof: ${typeof item.symbol}`)
    //   );
    // });
  } catch (ex) {
    console.log(`generateUrlArrayList error: ${ex}`);
  }
};

export {
  fetchWebApiStock,
  createUpdateStock,
  fetchDb,
  dbSearchApi,
  searchWebApi,
  generateUrlArrayStock,
  generateUrlArrayStockChart,
};

// Stock.find(
//   { $text: { $search: `"${curValueDbSearch}"` } },
//   { score: { $meta: 'textScore' } }
// )
//   .sort({
//     score: { $meta: 'textScore' }
//   })
