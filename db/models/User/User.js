import mongoose from 'mongoose';
import validator from 'validator';
// import bcrypt from 'bcryptjs';

const ParentSchema = new mongoose.Schema({
  // _id: Schema.Types.ObjectId,
  name: String,
  email: {
    type: String,
    required: true,
    unique: true, // Unique index. If you specify `unique: true`
    // specifying `index: true` is optional if you do `unique: true`
    lowercase: true,
    validate: value => validator.isEmail(value),
  },
  password: {
    type: String,
    minlength: 2,
    required: true,
    // select: false //--- select: {Boolean} - Specifies default path selection behavior. In other words, you can specify if this path should be included or excluded from query results by default.----By default it is not going to return the password when fetching a query. We have to SELECT the field to return it
  },
  resetToken: String,
  resetTokenExperation: Date,
  cash: {
    type: Number,
    default: 50000.0,
  },
  equity: {
    type: Number,
    default: 50000.0,
  },
});

// Encrypt password using bcrypt. Auto-gen a salt and hash - async
// ParentSchema.pre('save', async function(next) {
//   this.password = await bcrypt.hash(this.password, 12);
// });
export const User = mongoose.model('User', ParentSchema);
