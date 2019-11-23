/* eslint-disable dot-notation */
/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const axios = require('axios');
const { Stock } = require('./Stock');

const searchWebApi = async url => {
  try {
    const response = await axios.get(url);

    const highLow = response.data.bestMatches.map(item => ({
      symbol: item['1. symbol'],
    }));
    console.log(highLow.green);
    return highLow;
  } catch (ex) {
    console.log(`searchWebApi error: ${ex}`.red);
  }
};

const fetchWebApi = async url => {
  try {
    const response = await axios.get(url);
    // console.log(response);
    return response.data.map(item => ({
      date: Date.parse(item.date),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
      // parseInt vs unary plus  +dateObj["5. volume"]
    }));

    // return Object.entries(response.data['Time Series (Daily)']).map(
    //   ([date, dateObj]) => ({
    //     date: Date.parse(date),
    //     open: Math.round(parseFloat(dateObj['1. open']) * 100) / 100,
    //     high: Math.round(parseFloat(dateObj['2. high']) * 100) / 100,
    //     low: Math.round(parseFloat(dateObj['3. low']) * 100) / 100,
    //     close: Math.round(parseFloat(dateObj['4. close']) * 100) / 100,
    //     volume: parseInt(dateObj['5. volume']),
    //     // parseInt vs unary plus  +dateObj["5. volume"]
    //   })
    // );
  } catch (ex) {
    console.log(`fetchWebApi error: ${ex}`.red);
  }
};

const creatStock = async (symbol, webApiData) => {
  try {
    const webApiDataReversed = webApiData.reverse();
    const query = { symbol };

    const position = await Stock.findOne(query);

    if (!position) {
      console.log('New stock'.green);
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
  } catch (ex) {
    console.log(`creatStock error: ${ex}`.red);
  }
};

const fetchDb = async symbol => {
  try {
    const query = { symbol: symbol };
    const projection = { _id: 0, data: 1 };

    const chartData = await Stock.findOne(query, projection).sort({ date: -1 });
    // console.log(`chartData in services:${JSON.stringify(chartData)}`.green);
    return chartData.data.map(item => ({
      date: parseFloat(item.date),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume),
    }));
  } catch (ex) {
    console.log(`fetchDb error: ${ex}`.red);
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
    console.log(`dbSearchApi error: ${ex}`.red);
  }
};

// Stock.find(
//   { $text: { $search: `"${curValueDbSearch}"` } },
//   { score: { $meta: 'textScore' } }
// )
//   .sort({
//     score: { $meta: 'textScore' }
//   })

module.exports = {
  fetchWebApi,
  creatStock,
  fetchDb,
  dbSearchApi,
  searchWebApi,
};
