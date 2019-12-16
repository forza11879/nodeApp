const { User } = require('./User');

const updateCash = async (arg, userId) => {
  try {
    const { orderType } = arg;
    const qty = parseInt(arg.qty);
    const price = parseFloat(arg.price);
    let transactionAmount = qty * price;
    console.log(`fetchNewCash function for userId: ${userId}`);

    const query = { _id: userId }; // Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

    const projection = { _id: 1 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    const user = await User.findOne(query);
    // .select('cash');
    // findOne() returns the Object{} without the Array vs find() Array[{}] of Objects
    console.log(`old cash:${typeof user}`);
    console.log(`old cash:${JSON.stringify(user)}`);

    if (orderType === 'Sell')
      transactionAmount = Math.abs(transactionAmount) * -1;
    const { cash } = user;

    console.log(`destructor cash:${JSON.stringify(cash)}`);
    const newCash = parseFloat(cash) - transactionAmount;
    user.cash = newCash;
    await user.save();

    return {
      name: user.name,
      cash: parseFloat(user.cash),
      equity: parseFloat(user.equity),
    };
  } catch (ex) {
    console.log(`fetchNewCash error: ${ex}`);
  }
};

module.exports = {
  updateCash,
};
