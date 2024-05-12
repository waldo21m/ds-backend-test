import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/RequestExtended.interface';
import { UserTypes } from '../utils/userTypes.enum';
import boom from '@hapi/boom';
import { ITopic } from '../interfaces/Topic.interface';
import * as TopicService from '../services/topic.service';
import * as ContentService from '../services/content.service';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string;
    const topics = await TopicService.findAll(search);

    return res.json({ topics });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch topics'));
  }
};

const findContentsByTopicId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const topicId = req.params.topicId as string
    const contents = await ContentService.findContentsByTopicId(page, limit, topicId);

    const totalContents = await ContentService.countContentsByTopicId(topicId);

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

    const topic = await TopicService.findByName(req.body.name);

    if (topic) {
      return next(boom.badRequest('The topic already exists'));
    }

    const newTopic = await TopicService.create(req.body as ITopic);

    res.status(201).json({ topic: newTopic });
  } catch (error) {
    console.error(error);
    next(boom.badImplementation('Failed to create topic'));
  }
};

export default {
  findAll,
  findContentsByTopicId,
  create,
};
