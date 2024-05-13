import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import * as BlacklistedTokenService from '../services/blacklistedToken.service';

const checkJWT = async (_: Request, res: Response) => {
  return res.status(204).send();
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.split(' ')[1];
      await BlacklistedTokenService.create({ token });
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(boom.badImplementation('Failed to log out'));
  }
};

export default {
  checkJWT,
  logout,
};
