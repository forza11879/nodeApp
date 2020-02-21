import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const ChildSchemaData = new mongoose.Schema({
  _id: false,
  symbol: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 50,
    uppercase: true,
    require: true,
  },
});

const ParentSchema = new mongoose.Schema({
  data: [ChildSchemaData],
  userId: { type: ObjectId, ref: 'User', required: true },
});

ParentSchema.index({ userId: 1 }, { unique: true });

export const List = mongoose.model('List', ParentSchema);
