// eslint-disable-next-line no-unused-vars
import colors from 'colors';

import axios from 'axios';
import moment from 'moment';

const getWithRetry = async (url, numberOfRetries = 3) => {
  let lastError = null;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfRetries; ++i) {
    try {
      const response = await axios.get(url);
      const { data } = response;
      return data;
    } catch (error) {
      lastError = error;
      console.log('getWithRetry error: ', error);
    }
  }
  throw lastError;
};

const fetchWebApiQuote = async url => {
  try {
    const data = await getWithRetry(url);

    return {
      symbol: data.symbol,
      companyName: data.companyName,
      latestPrice: data.latestPrice,
      change: data.change,
      latestUpdate: moment(data.latestUpdate)
        .utcOffset(-240)
        .format('LLLL'),
      high: data.high,
      low: data.low,
      week52High: data.week52High,
      week52Low: data.week52Low,
      open: data.open,
      previousClose: data.previousClose,
    };
  } catch (ex) {
    console.log(`fetchWebApiQuote error: ${ex}`.red);
  }
};

export { getWithRetry, fetchWebApiQuote };
