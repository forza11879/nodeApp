// const findUserEmailDB = async email => {
//   try {
//     const query = { email: email };
//     const user = await User.findOne(query);
//     // .select('email'); //findOne() returns the Object{} without the Array vs find() Array[{}] of Objects
//     console.log(user);
//     return user;
//   } catch (ex) {
//     console.log(`findUserEmailDB error: ${ex}`);
//   }
// };

// const fetchUserDataDB = async userId => {
//   try {
//     const query = { _id: userId }; // Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

//     const projection = { _id: 1 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

//     const user = await User.findById(query, projection).select(
//       '_id name cash equity'
//     ); // findOne() returns the Object{} without the Array vs find() Array[{}] of Objects
//     return {
//       id: user._id,
//       name: user.name,
//       cash: parseFloat(user.cash),
//       equity: parseFloat(user.equity),
//     };
//   } catch (ex) {
//     console.log(`fetchUserDataDB error: ${ex}`);
//   }
// };

// const updateCashDB = async (cash, userId) => {
//   try {
//     console.log(`updateCashDB cash as the arg:${JSON.stringify(cash)}`);
//     const query = { _id: userId };

//     const update = {
//       cash,
//     };
//     // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
//     // upsert: bool - creates the object if it doesn't exist. defaults to false.
//     const options = { upsert: true, new: true };

//     const stockUserResult = await User.findOneAndUpdate(
//       query,
//       update,
//       options
//     ).select('name cash equity -_id');
//     console.log(
//       `stockUserResult in services:${JSON.stringify(stockUserResult)}`
//     );
//     return {
//       name: stockUserResult.name,
//       cash: parseFloat(stockUserResult.cash),
//       equity: parseFloat(stockUserResult.equity),
//     };
//   } catch (ex) {
//     console.log(`updateToUser error: ${ex}`);
//   }
// };
