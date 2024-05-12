import { NextFunction, Request, RequestHandler, Response } from 'express';
import boom from '@hapi/boom';
import {
  IGenericType,
  IParamCheckerType,
} from '../interfaces/QueryParamsChecker.interface';

export function queryParamsChecker(
  queryParams: IGenericType,
  paramName: string,
  isRequired = true,
): boolean {
  const param: string = queryParams[paramName];
  if (!param && isRequired) {
    return false;
  }

  return true;
}

export const queryParamsCheckerMiddleware = (
  params: IParamCheckerType,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const key in params) {
        const is_valid = queryParamsChecker(req.query, key, params[key]);
        if (!is_valid) {
          const {
            output: { statusCode, payload },
          } = boom.badRequest(`${key} parameter is required.`);
          return res.status(statusCode).json(payload);
        }
      }
      return next();
    } catch (err) {
      const {
        output: { statusCode, payload },
      } = boom.badImplementation();
      res.status(statusCode).json(payload);
    }
  };
};
