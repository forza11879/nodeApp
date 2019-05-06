const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      unique: true
    },
    qtyPortfolio: Number,
    // avgPrice: { type: mongoose.Types.Decimal128 },
    date: {
      type: Date,
      default: Date.now
    },
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { toJSON: { virtuals: true } }
); // Set `virtuals: true` so `res.json()` works
//Keep in mind that virtuals are not included in toJSON() output by default. If you want populate virtuals to show up when using functions that rely on JSON.stringify(), like Express' res.json() function, set the virtuals: true option on your schema's toJSON options.

ParentSchema.virtual('portfolioSymbol', {
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

module.exports.Portfolio = mongoose.model('Portfolio', ParentSchema);
