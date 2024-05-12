import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const BlacklistedTokenSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    token: {
      type: String,
      index: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const BlacklistedToken = mongoose.model(
  'BlacklistedToken',
  BlacklistedTokenSchema,
);

export default BlacklistedToken;
