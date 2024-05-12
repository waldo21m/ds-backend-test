import boom, { Boom, Output } from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';

export function withErrorStack(err: boom.Output): Output {
  return err;
}

export function logErrors(
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  console.log(err);

  next(err);
}

export function wrapErrors(
  err: Boom,
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (!err.isBoom) {
    next(boom.badImplementation(err.toString()));
  }

  next(err);
}

export function errorHandler(
  err: Boom,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(payload);
}
