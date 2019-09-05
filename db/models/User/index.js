const bcrypt = require('bcryptjs');

const { User } = require('./User');

const fetchUserDataDB = async userId => {
  try {
    const query = { _id: userId }; //Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

    const projection = { _id: 1 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    const user = await User.findById(query, projection).select(
      '_id name cash equity'
    ); //findOne() returns the Object{} without the Array vs find() Array[{}] of Objects
    return {
      id: user._id,
      name: user.name,
      cash: parseFloat(user.cash),
      equity: parseFloat(user.equity)
    };
  } catch (ex) {
    console.log(`fetchUserDataDB error: ${ex}`);
  }
};

const findUserEmailDB = async email => {
  try {
    const query = { email: email };
    const user = await User.findOne(query);
    // .select('email'); //findOne() returns the Object{} without the Array vs find() Array[{}] of Objects
    console.log(user);
    return user;
  } catch (ex) {
    console.log(`findUserEmailDB error: ${ex}`);
  }
};

const fetchCashDB = async arg => {
  try {
    const orderType = arg.orderType;
    const qty = parseInt(arg.qty);
    const price = parseFloat(arg.price);
    let transactionAmount = qty * price;
    console.log('fetchCash function for userId:' + arg.userId);

    const query = { _id: arg.userId }; //Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

    const projection = { _id: 1 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    const oldCash = await User.findOne(query, projection).select('cash'); //findOne() returns the Object{} without the Array vs find() Array[{}] of Objects
    console.log('old cash:' + typeof oldCash);
    console.log('old cash:' + JSON.stringify(oldCash));

    if (orderType === 'Sell')
      transactionAmount = Math.abs(transactionAmount) * -1;
    const { cash } = oldCash;
    console.log('destructor cash:' + JSON.stringify(cash));
    return (newCash = parseFloat(cash) - transactionAmount);
  } catch (ex) {
    console.log(`fetchCash error: ${ex}`);
  }
};

const updateCashDB = async (arg, cash) => {
  try {
    console.log('stockUserResult in services:' + JSON.stringify(cash));
    const stockUser = new User({
      _id: arg.userId,
      cash: cash
    });

    const query = { _id: stockUser._id };
    const update = {
      cash: stockUser.cash
    };
    // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    // upsert: bool - creates the object if it doesn't exist. defaults to false.
    const options = { upsert: true, new: true };

    const stockUserResult = await User.findOneAndUpdate(
      query,
      update,
      options
    ).select('name cash equity -_id');
    console.log(
      'stockUserResult in services:' + JSON.stringify(stockUserResult)
    );
    return {
      name: stockUserResult.name,
      cash: parseFloat(stockUserResult.cash),
      equity: parseFloat(stockUserResult.equity)
    };
  } catch (ex) {
    console.log(`updateToUser error: ${ex}`);
  }
};

const creatUser = async (name, email, password) => {
  try {
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    console.log(`created user: ${user}`);

    await user.save();

    ////////////////

    const query = { email: email };

    const newUser = await User.findOne(query);
    console.log('new user saved to db', newUser);
  } catch (ex) {
    console.log(`creatStock error: ${ex}`);
  }
};

module.exports = {
  fetchCashDB,
  updateCashDB,
  fetchUserDataDB,
  findUserEmailDB,
  creatUser
};
