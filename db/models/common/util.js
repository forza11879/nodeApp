/* eslint-disable no-loop-func */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

import axios from 'axios';
import moment from 'moment';
import { Stock } from '../Stock/Stock.js';

const getWithRetry = async (url, numberOfRetries = 3) => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  // const { CancelToken } = axios;
  // let cancel;
  // http://axios-js.com/docs/index.html

  let lastError = null;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfRetries; ++i) {
    // try {
    const response = await axios
      // .get(url, {
      //   cancelToken: new CancelToken(function executor(c) {
      //     // An executor function receives a cancel function as a parameter
      //     cancel = c;
      //   }),
      // })
      .get(url, {
        cancelToken: source.token,
      })
      // eslint-disable-next-line no-loop-func
      .catch(function(thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request CANCELED', thrown.message);
        } else {
          lastError = thrown.message;
          console.log('getWithRetry error: ', thrown.message);
        }
      });
    const { data } = response;
    // console.log('DATA: ', data);
    // console.log('RESPONSE: ', response);
    if (data.Note) {
      console.log('OPERATION CANCELED BY setTimeout.');
      // cancel the request (the message parameter is optional)
      source.cancel('Operation canceled by the user.');
      // setTimeout(function() {
      //   console.log('OPERATION CANCELED BY setTimeout.');
      //   // cancel the request (the message parameter is optional)
      //   source.cancel('Operation canceled by the user.');
      //   // cancel();
      // }, 100);
    }
    return data;
    // } catch (error) {
    //   lastError = error;
    //   console.log('getWithRetry error: ', error);
    // }
  }
  // setTimeout(function() {
  //   console.log('OPERATION CANCELED BY setTimeout.');
  //   // cancel the request (the message parameter is optional)
  //   // source.cancel('Operation canceled by the user.');
  //   cancel();
  // }, 100);
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

const getSymbolId = async symbol => {
  try {
    const query = { symbol };
    const projection = { _id: 1 };
    const symbolId = await Stock.findOne(query, projection);
    // console.log('symbolId in GetSymbol', symbolId);
    return symbolId;
  } catch (ex) {
    console.log(`getSymbolId error: ${ex}`.red);
  }
};

export { getWithRetry, fetchWebApiQuote, getSymbolId };
