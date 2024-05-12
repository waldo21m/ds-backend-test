import { IUser } from '../interfaces/User.interface';
import User from '../models/User.model';

export const findAll = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const users = await User.find({ isDeleted: false })
    .select('_id username email userType')
    .skip(offset)
    .limit(limit)
    .exec();

  return users;
};

export const countUsers = async () => {
  const count = await User.countDocuments({ isDeleted: false }).exec();

  return count;
};

export const findById = async (id: string) => {
  const user = await User.findOne({ _id: id, isDeleted: false }).exec();

  return user;
};

export const findByEmail = async (email: string) => {
  const user = await User.findOne({ email, isDeleted: false }).exec();

  return user;
};

export const findByEmailOrUsername = async (
  email: string,
  username: string,
) => {
  return await User.findOne({
    $or: [{ email }, { username }],
    isDeleted: false,
  })
    .select('_id username email password userType')
    .exec();
};

export const create = async (user: IUser) => {
  const newUser = new User(user);
  const savedUser = await newUser.save();

  return savedUser;
};

export const update = async (id: string, user: Partial<IUser>) => {
  return User.updateOne(
    {
      _id: id,
      isDeleted: false,
    },
    user,
  ).exec();
};

export const softDelete = async (id: string) => {
  return User.updateOne({ _id: id }, { isDeleted: true }).exec();
};

export const destroy = async (id: string) => {
  return User.deleteOne({ _id: id }).exec();
};
