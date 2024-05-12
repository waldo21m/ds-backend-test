import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ContentTypeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

const ContentType = mongoose.model('ContentType', ContentTypeSchema);

export default ContentType;
