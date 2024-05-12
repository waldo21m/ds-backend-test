import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// TODO: Add admin user in the first try and 3 content types.
const healthCheck = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json({ message: 'Deploy successfully' });
  } catch (error) {
    next(boom.badImplementation('Failed to create initial data'));
  }
};

export default {
  healthCheck,
};
