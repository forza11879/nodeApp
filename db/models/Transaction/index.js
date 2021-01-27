/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

// services
import * as portfolio from '../Portfolio/index.js';
// models
import { Transaction } from './Transaction.js';
import { Stock } from '../Stock/Stock.js';
import { ErrorResponse } from '../../../utils/errorResponse.js';
import { asyncHandler } from '../../../middleware/async.js';
import * as util from '../common/util.js';

const addTransaction = async (arg, symbolId, userId) => {
  try {
    const { price, qty, orderType } = arg;

    // const lastIndex = webApiDataReversed.length - 1;

    arg.userId = userId;
    arg.symbolId = symbolId;
    // arg.data = webApiDataReversed[lastIndex];

    console.log('symbolId', symbolId);

    // error is catched by try/catch
    Transaction.create({
      price: price,
      qty: qty,
      orderType: orderType,
      userId: userId,
      symbolId: symbolId,
    });
  } catch (ex) {
    console.log(`addTransaction error: ${ex}`.red);
    // next(new ErrorResponse(`Error: ${ex}`, 404));
    // next(ex);
  }
};

export { addTransaction };
