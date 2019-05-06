const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ParentSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    orderType: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['buy', 'sell']
    },
    date: {
      type: Date,
      default: Date.now
    },
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { toJSON: { virtuals: true } }
); // Set `virtuals: true` so `res.json()` works
//Keep in mind that virtuals are not included in toJSON() output by default. If you want populate virtuals to show up when using functions that rely on JSON.stringify(), like Express' res.json() function, set the virtuals: true option on your schema's toJSON options.

ParentSchema.virtual('transactionSymbol', {
  ref: 'Stock', // The model to use
  localField: 'symbol', // Find people where `localField`
  foreignField: 'symbol', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { sort: { symbol: -1 } }
});

// Populate Virtuals
// https://mongoosejs.com/docs/populate.html#populate-virtuals

module.exports.Transaction = mongoose.model('Transaction', ParentSchema);

// const author = new Person({
//   _id: new mongoose.Types.ObjectId(),
//   name: 'Ian Fleming',
//   age: 50
// });

// author.save(function (err) {
//   if (err) return handleError(err);

//   const story1 = new Story({
//     title: 'Casino Royale',
//     author: author._id    // assign the _id from the person
//   });

//   story1.save(function (err) {
//     if (err) return handleError(err);
//     // thats it!
//   });
// });
