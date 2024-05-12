import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import * as UserService from '../services/user.service';
import * as ContentTypeService from '../services/contentType.service';
import * as TopicService from '../services/topic.service';
import { IUser } from '../interfaces/User.interface';
import { UserTypes } from '../utils/userTypes.enum';
import { IContentType } from '../interfaces/ContentType.interface';

dotenv.config();

const bcryptSaltRound = process.env.BCRYPT_SALT_ROUNDS
  ? +process.env.BCRYPT_SALT_ROUNDS
  : 10;

const username = process.env.ADMIN_USERNAME || 'admin';
const email = process.env.ADMIN_EMAIL || 'admin@test.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

const healthCheck = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const usersCount = await UserService.countUsers();
    const contentTypesCount = await ContentTypeService.countContentTypes();
    const topicsCount = await TopicService.countTopics();

    if (usersCount === 0) {
      const password = await bcrypt.hash(adminPassword, bcryptSaltRound);

      const user: IUser = {
        username,
        email,
        password,
        userType: UserTypes.Admin,
      };

      await UserService.create(user);
    }

    if (contentTypesCount === 0) {
      const contentType1: IContentType = { name: 'Imágenes' };
      const contentType2: IContentType = { name: 'Videos-url YouTube' };
      const contentType3: IContentType = { name: 'Documentos txt' };

      const newContentType1 = await ContentTypeService.create(contentType1);
      const newContentType2 = await ContentTypeService.create(contentType2);
      const newContentType3 = await ContentTypeService.create(contentType3);

      if (topicsCount === 0) {
        const topicBody1 = {
          name: 'Ciencias',
          contentPermissions: [
            newContentType1._id,
            newContentType2._id,
            newContentType3._id,
          ],
          coverImage: 'https://dummyimage.com/1920x400/9fa8da/ffffff&text=Ciencias',
        };
        const topicBody2 = {
          name: 'Matemáticas',
          contentPermissions: [
            newContentType2._id,
            newContentType3._id,
          ],
          coverImage: 'https://dummyimage.com/1920x400/9fa8da/ffffff&text=Matemáticas',
        };
        const topicBody3 = {
          name: 'Deportes',
          contentPermissions: [
            newContentType1._id,
            newContentType2._id,
          ],
          coverImage: 'https://dummyimage.com/1920x400/9fa8da/ffffff&text=Deportes',
        };
        const topicBody4 = {
          name: 'Deportes acuáticos',
          contentPermissions: [
            newContentType1._id,
            newContentType2._id,
          ],
          coverImage: 'https://dummyimage.com/1920x400/9fa8da/ffffff&text=DA',
        };

        await Promise.all([
          TopicService.create(topicBody1),
          TopicService.create(topicBody2),
          TopicService.create(topicBody3),
          TopicService.create(topicBody4),
        ]);
      }
    }

    return res.json({ message: 'Deploy successfully' });
  } catch (error) {
    next(boom.badImplementation('Failed to create initial data'));
  }
};

export default {
  healthCheck,
};
