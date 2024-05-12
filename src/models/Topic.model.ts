import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const TopicSchema = new mongoose.Schema(
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
    contentPermissions: [
      {
        type: String,
        ref: 'ContentType',
        trim: true,
      },
    ],
    coverImage: {
      type: String,
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

const Topic = mongoose.model('Topic', TopicSchema);

export default Topic;
