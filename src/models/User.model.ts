import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UserTypes } from '../utils/userTypes.enum';

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    userType: {
      type: String,
      enum: [UserTypes.Admin, UserTypes.Reader, UserTypes.Creator],
      required: true,
      trim: true,
    },
    createdContents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        trim: true,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

const User = mongoose.model('User', UserSchema);

export default User;
