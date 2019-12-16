/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const mongoose = require('mongoose');

const model = mongoose.models;

const updateCash = async (arg, userId) => {
  try {
    const { orderType } = arg;
    const qty = parseInt(arg.qty);
    const price = parseFloat(arg.price);
    let transactionAmount = qty * price;

    const query = { _id: userId };
    const user = await model.User.findOne(query);

    if (orderType === 'Sell')
      transactionAmount = Math.abs(transactionAmount) * -1;
    const { cash: oldCash } = user;

    const newCash = parseFloat(oldCash) - transactionAmount;
    user.cash = newCash;
    await user.save();
    const { name, cash, equity } = user;

    return {
      name: name,
      cash: parseFloat(cash),
      equity: parseFloat(equity),
    };
  } catch (ex) {
    console.log(`fetchNewCash error: ${ex}`);
  }
};

module.exports = {
  updateCash,
};
