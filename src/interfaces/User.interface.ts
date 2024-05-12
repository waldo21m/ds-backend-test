import { UserTypes } from '../utils/userTypes.enum';

export interface IUser {
  username: string;
  email: string;
  password: string;
  userType: UserTypes;
}
