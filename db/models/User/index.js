// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import { User } from './User.js';

const updateCash = async (arg, userId) => {
  try {
    const { orderType } = arg;

    const qty = parseInt(arg.qty);
    const price = parseFloat(arg.price);
    let transactionAmount = qty * price;

    const query = { _id: userId };
    const user = await User.findOne(query);

    if (orderType === 'Sell')
      transactionAmount = Math.abs(transactionAmount) * -1;

    const { cash } = user;

    const newCash = parseFloat(cash) - transactionAmount;
    user.cash = newCash;
    await user.save();

    console.log('cash: ', parseFloat(user.cash));
    console.log('totalEquity: ', parseFloat(user.equity));

    return {
      name: user.name,
      cash: parseFloat(user.cash),
      equity: parseFloat(user.equity),
    };
  } catch (ex) {
    console.log(`fetchNewCash error: ${ex}`);
  }
};

export { updateCash };
