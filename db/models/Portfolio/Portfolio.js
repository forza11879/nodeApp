const colors = require('colors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentSchema = new mongoose.Schema({
  // _id: { userId: 1, symbol: 1 }, //The _id field is always unique. That way you kind of get a composite primary key. Just be careful when creating these ids that the order of keys (a(userId) and b(symbol) in the example) matters, if you swap them around, it is considered a different object.
  qtyPortfolio: {
    type: Number,
    required: true
  },
  avgPrice: { type: Number, required: true },
  // avgPrice: { type: mongoose.Types.Decimal128, default: 0.0 },
  date: {
    type: Date,
    default: Date.now
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  symbolId: { type: Schema.Types.ObjectId, ref: 'Stock', required: true }
});

ParentSchema.index({ userId: 1, symbolId: 1 }, { unique: true });

// Static method to remove Zero Position in portfolio
// ParentSchema.statics.removeZeroPosition = async function(
//   userId,
//   symbolId,
//   qtyPortfolio
// ) {
//   try {
//     console.log(`console POST SAVE`.red);
//     const query = { userId: userId, symbolId: symbolId };
//     // const query = { symbolId: symbolId };
//     // const position = await this.model('Portfolio').findOne(query);
//     // console.log(position.red);
//     if (qtyPortfolio === 0)
//       await this.model('Portfolio')
//         .remove(query)
//         .exec();
//     next();
//   } catch (err) {
//     console.error(`erro from removeZeroPosition${err}`.red);
//     console.log(`erro from removeZeroPosition${err}`.red);
//   }
// };

// Call getAverageCost after save
// ParentSchema.post('findOneAndUpdate', function() {
//   this.constructor.removeZeroPosition(
//     this.userId,
//     this.symbolId,
//     this.qtyPortfolio
//   );
// });

// ParentSchema.post('findOneAndUpdate', async function() {
//   const docToUpdate = await this.model.findOne(this.getQuery());
//   console.log(docToUpdate.red); // The document that `findOneAndUpdate()` will modify
// });

// After save
ParentSchema.pre('save', async function(next) {
  try {
    const query = { userId: this.userId, symbolId: this.symbolId };
    if (this.qtyPortfolio === 0) {
      console.log(`console Pre SAVE`.red);
      console.log(`User ID ${this.userId}`.red);
      console.log(`Symbol ID ${this.symbolId}`.red);

      await this.model('Portfolio').deleteOne(query);
    }
    next();
  } catch (err) {
    console.log(`error from Pre SAVE hook${err}`.red);
  }
});

// ParentSchema.pre("remove", async function(next) {

//   await this.model('Portfolio').remove(query).exec();
//   Post.remove({ postedBy: this._id }).exec();
//   next();
// });

module.exports.Portfolio = mongoose.model('Portfolio', ParentSchema);
