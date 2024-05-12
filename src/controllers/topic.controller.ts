import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/RequestExtended.interface';
import { UserTypes } from '../utils/userTypes.enum';
import boom from '@hapi/boom';
import { ITopic } from '../interfaces/Topic.interface';
import * as TopicService from '../services/topic.service';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string;
    const topics = await TopicService.findAll(search);

    return res.json({ topics });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch topics'));
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
  create,
};
