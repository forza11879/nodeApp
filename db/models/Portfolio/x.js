const mongoose = require('mongoose');

const { Schema } = mongoose;

const ParentSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      unique: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
      uppercase: true,
      required: 'Please enter a valid symbol, min 1 character',
    },
    qtyPortfolio: Number,
    // avgPrice: { type: mongoose.Types.Decimal128 },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { toJSON: { virtuals: true } }
); // Set `virtuals: true` so `res.json()` works
// Keep in mind that virtuals are not included in toJSON() output by default. If you want populate virtuals to show up when using functions that rely on JSON.stringify(), like Express' res.json() function, set the virtuals: true option on your schema's toJSON options.

// // Reverse populate with virtuals
// ParentSchema.virtual('portfolioSymbol', {
//   ref: 'Stock', // The model to use
//   localField: 'symbolId', // the file in the ParentSchema
//   foreignField: '_id', // the field in the reference Table(Document)
//   // If `justOne` is true, 'members' will be a single doc as opposed to
//   // an array. `justOne` is false by default.
//   justOne: false,
//   options: { sort: { symbol: -1 } },
// });

// Populate Virtuals
// https://mongoosejs.com/docs/populate.html#populate-virtuals

module.exports.Portfolio = mongoose.model('Portfolio', ParentSchema);

// After save
// ParentSchema.pre('save', async function(next) {
//   try {
//     const query = { userId: this.userId, symbolId: this.symbolId };
//     if (this.qtyPortfolio === 0) {
//       console.log(`console Pre SAVE`.red);
//       console.log(`User ID ${this.userId}`.red);
//       console.log(`Symbol ID ${this.symbolId}`.red);

//       await this.model('Portfolio').deleteOne(query);
//     }
//     next();
//   } catch (err) {
//     console.log(`error from Pre SAVE hook${err}`.red);
//   }
// });

// const fetchPortfolioList = async userId => {
//   try {
//     // console.log(`fetchPortfolioList userId: ${userId}`);
//     // console.log(`fetchPortfolioList userId: ${JSON.stringify(userId)}`);

//     const portfolioListQ = await Portfolio.aggregate([
//       { $match: { userId: userId } },
//       {
//         $lookup: {
//           from: 'stocks', // collection name in db
//           let: { symbolId: '$symbolId' },
//           pipeline: [
//             { $match: { $expr: { $eq: ['$_id', '$$symbolId'] } } },
//             { $project: { data: { $slice: ['$data', 1] }, symbol: 1 } },
//             {
//               $lookup: {
//                 from: 'transactions', // collection name in db
//                 let: { stockId: '$_id' },
//                 pipeline: [
//                   {
//                     $match: {
//                       userId: userId,
//                       $expr: {
//                         $eq: ['$symbolId', '$$stockId'],
//                       },
//                     },
//                   },
//                   {
//                     $group: {
//                       _id: { orderType: '$orderType' },
//                       totalBuySellTradeAmount: {
//                         $sum: { $multiply: ['$price', '$qty'] },
//                       },
//                     },
//                   },
//                 ],
//                 as: 'transactionDb',
//               },
//             },
//           ],
//           as: 'symbolDb',
//         },
//       },
//     ]);

//     return portfolioListQ;
//   } catch (ex) {
//     console.log(`fetchPortfolioList error: ${ex}`.red);
//   }
// };
