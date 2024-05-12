import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().required(),
  data: Joi.string().required(),
  contentType: Joi.string().uuid({ version: 'uuidv4' }),
  topic: Joi.string().uuid({ version: 'uuidv4' }),
  createdBy: Joi.string().uuid({ version: 'uuidv4' }),
});
