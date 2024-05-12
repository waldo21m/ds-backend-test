import { Request as ExpressRequest } from 'express';
import { IUserWithJWT } from './User.interface';

export interface Request extends ExpressRequest {
  user?: Partial<IUserWithJWT>;
}
