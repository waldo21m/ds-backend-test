import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ContentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: String,
      required: true,
      trim: true,
    },
    contentType: {
      type: String,
      ref: 'ContentType',
      trim: true,
    },
    topic: {
      type: String,
      ref: 'Topic',
      trim: true,
    },
    createdBy: {
      type: String,
      ref: 'User',
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

const Content = mongoose.model('Content', ContentSchema);

export default Content;
