import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().required(),
  contentPermissions: Joi.array()
    .items(Joi.string().uuid({ version: 'uuidv4' }))
    .required(),
  coverImage: Joi.string().required(),
});
