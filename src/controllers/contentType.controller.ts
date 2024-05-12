import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/RequestExtended.interface';
import { UserTypes } from '../utils/userTypes.enum';
import boom from '@hapi/boom';
import { IContentType } from '../interfaces/ContentType.interface';
import * as ContentTypeService from '../services/contentType.service';

const findAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const contentTypes = await ContentTypeService.findAll();

    return res.json({ contentTypes });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch content types'));
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user?.userType !== UserTypes.Admin) {
      return next(boom.forbidden('Forbidden'));
    }

    const contentType = await ContentTypeService.findByName(req.body.name);

    if (contentType) {
      return next(boom.badRequest('The content type already exists'));
    }

    const newContentType = await ContentTypeService.create(req.body as IContentType);

    res.status(201).json({ contentType: newContentType });
  } catch (error) {
    next(boom.badImplementation('Failed to create content type'));
  }
};

export default {
  findAll,
  create,
};
