import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/RequestExtended.interface';
import { UserTypes } from '../utils/userTypes.enum';
import boom from '@hapi/boom';
import { IContentType } from '../interfaces/ContentType.interface';
import * as ContentTypeService from '../services/contentType.service';
import * as TopicService from '../services/topic.service';
import * as ContentService from '../services/content.service';

const findAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const contentTypes = await ContentTypeService.findAll();

    return res.json({ contentTypes });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch content types'));
  }
};

const findTopicsByContentTypeId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contentTypeId = req.params.contentTypeId as string
    const topics = await TopicService.findTopicsByContentTypeId(contentTypeId);

    return res.json({ topics });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch topics by content type id'));
  }
};

const findContentsByContentTypeId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const contentTypeId = req.params.contentTypeId as string
    const contents = await ContentService.findContentsByContentTypeId(page, limit, contentTypeId);

    const totalContents = await ContentService.countContentsByContentTypeId(contentTypeId);

    const totalPages = Math.ceil(totalContents / limit);

    return res.json({
      contents,
      totalPages,
    });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch contents by user id'));
  }
};

const findContentsByContentTypeIdAndTopicId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const contentTypeId = req.params.contentTypeId as string
    const topicId = req.params.topicId as string
    const contents = await ContentService.findContentsByContentTypeIdAndTopicId(page, limit, contentTypeId, topicId);

    const totalContents = await ContentService.countContentsByContentTypeIdAndTopicId(contentTypeId, topicId);

    const totalPages = Math.ceil(totalContents / limit);

    return res.json({
      contents,
      totalPages,
    });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch contents by user id'));
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
  findTopicsByContentTypeId,
  findContentsByContentTypeId,
  findContentsByContentTypeIdAndTopicId,
  create,
};
