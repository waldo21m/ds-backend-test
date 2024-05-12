import boom from '@hapi/boom';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

export function validate(
  data: any,
  scheme: Joi.ObjectSchema<unknown>,
): Error | undefined {
  const { error } = scheme.validate(data);

  return error;
}

export function validationHandler(
  scheme: Joi.ObjectSchema<unknown>,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const err = validate(req.body, scheme);
    if (err) {
      const {
        output: { statusCode, payload },
      } = boom.badRequest(err.toString());
      return res.status(statusCode).json(payload);
    } else {
      next();
    }
  };
}
