const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChildSchemaData = new mongoose.Schema({
  _id: false,
  symbol: {
    type: String,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
    uppercase: true,
    require: true,
    sparse: true, // need to look into it
    // https://stackoverflow.com/questions/24430220/e11000-duplicate-key-error-index-in-mongodb-mongoose
  },
});

const ParentSchema = new mongoose.Schema({
  data: [ChildSchemaData],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

ParentSchema.index({ userId: 1 }, { unique: true });

module.exports.List = mongoose.model('List', ParentSchema);
