import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/RequestExtended.interface';
import { UserTypes } from '../utils/userTypes.enum';
import boom from '@hapi/boom';
import { IContent } from '../interfaces/Content.interface';
import * as ContentService from '../services/content.service';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = req.query.search as string;

    const contents = await ContentService.findAll(page, limit, search);

    const totalContents = await ContentService.countContents(search);

    const totalPages = Math.ceil(totalContents / limit);

    return res.json({
      contents,
      totalPages,
    });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch contents'));
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contentId = req.params.contentId as string;
    const content = await ContentService.findById(contentId);

    return res.json({ content });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch content by id'));
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user?.userType === UserTypes.Reader) {
      return next(boom.forbidden('Forbidden'));
    }

    const content = await ContentService.findByName(req.body.name);

    if (content) {
      return next(boom.badRequest('The content already exists'));
    }

    const newContent = await ContentService.create(req.body as IContent);

    res.status(201).json({ content: newContent });
  } catch (error) {
    console.error(error);
    next(boom.badImplementation('Failed to create content'));
  }
};

export default {
  findAll,
  findById,
  create,
};
