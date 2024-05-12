import { IBlacklistedToken } from '../interfaces/BlacklistedToken.interface';
import BlacklistedToken from '../models/BlacklistedToken.model';

export const findByToken = async (token: string) => {
  const blacklistedToken = await BlacklistedToken.findOne({ token }).exec();

  return blacklistedToken;
};

export const create = async (body: IBlacklistedToken) => {
  const newBlacklistedToken = new BlacklistedToken(body);
  const savedBlacklistedToken = await newBlacklistedToken.save();

  return savedBlacklistedToken;
};
