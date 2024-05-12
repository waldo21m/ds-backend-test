import { UserTypes } from '../utils/userTypes.enum';

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  userType: UserTypes;
}

export interface IUserWithJWT extends IUser {
  iat: number;
}
