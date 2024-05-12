import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import * as UserService from '../services/user.service';
import * as ContentTypeService from '../services/contentType.service';
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

      await Promise.all([
        ContentTypeService.create(contentType1),
        ContentTypeService.create(contentType2),
        ContentTypeService.create(contentType3),
      ]);
    }

    return res.json({ message: 'Deploy successfully' });
  } catch (error) {
    next(boom.badImplementation('Failed to create initial data'));
  }
};

export default {
  healthCheck,
};
