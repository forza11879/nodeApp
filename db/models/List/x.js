// ***** findOneAndUpdate *******
// const query = { userId: stockList.userId };
// const update = { $addToSet: { data: stockList.data } };
// // const update = { data: stockList.data };
// const options = { upsert: true, new: true }; // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
// // upsert: bool - creates the object if it doesn't exist. defaults to false.
// const stockResult = await List.findOneAndUpdate(query, update, options);

// ******findOne*****************
// const query = { userId: userId }; // Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
// const projection = { _id: 0 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.
// const dataFromDB = await List.findOne(query, projection).select('data'); // findOne returns the Object{} without the Array

//* **********Schema********************
// const ChildSchemaData = new mongoose.Schema({
//     _id: false,
//     symbol: {
//       type: String,
//       unique: true,
//       trim: true,
//       minlength: 1,
//       maxlength: 50,
//       uppercase: true,
//       require: true,
//       sparse: true, // need to look into it
//       // https://stackoverflow.com/questions/24430220/e11000-duplicate-key-error-index-in-mongodb-mongoose
//       // The sparse property in emailXXX , is what tells my database to allow null values which will later be filled with unique values
//     },
//   });
