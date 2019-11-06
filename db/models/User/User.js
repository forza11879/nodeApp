const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const ParentSchema = new mongoose.Schema({
  // _id: Schema.Types.ObjectId,
  name: String,
  email: {
    type: String,
    required: true,
    unique: true, // Unique index. If you specify `unique: true`
    // specifying `index: true` is optional if you do `unique: true`
    lowercase: true,
    validate: value => {
      return validator.isEmail(value);
    }
  },
  password: {
    type: String,
    minlength: 2,
    required: true
    //select: false //--- select: {Boolean} - Specifies default path selection behavior. In other words, you can specify if this path should be included or excluded from query results by default.----By default it is not going to return the password when fetching a query. We have to SELECT the field to return it
  },
  resetToken: String,
  resetTokenExperation: Date,
  cash: {
    type: mongoose.Types.Decimal128,
    default: 50000.0
  },
  equity: {
    type: mongoose.Types.Decimal128
  }
});

// Encrypt password using bcrypt. Auto-gen a salt and hash - async
ParentSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports.User = mongoose.model('User', ParentSchema);
