import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import * as BlacklistedTokenService from '../services/blacklistedToken.service';

dotenv.config();

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(' ')[1]; // Asume que el token viene en el header de autorización como "Bearer <token>"

    const isBlacklisted = await BlacklistedTokenService.findByToken(token);

    if (isBlacklisted) {
      return next(boom.unauthorized('This token has been blacklisted'));
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        return next(boom.unauthorized('Token not valid'));
      }

      // TODO: Fix this later!
      // req.user = user;
      next();
    });
  } else {
    next(boom.unauthorized('Token is required'));
  }
};
