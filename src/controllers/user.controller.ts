import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/User.interface';
import * as UserService from '../services/user.service';
import * as ContentService from '../services/content.service';

dotenv.config();

const bcryptSaltRound = process.env.BCRYPT_SALT_ROUNDS
  ? +process.env.BCRYPT_SALT_ROUNDS
  : 10;

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const users = await UserService.findAll(page, limit);

    const totalUsers = await UserService.countUsers();

    const totalPages = Math.ceil(totalUsers / limit);

    return res.json({
      users,
      totalPages,
    });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch users'));
  }
};

const findContentsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const userId = req.params.userId as string
    const contents = await ContentService.findContentsByUserId(page, limit, userId);

    const totalContents = await ContentService.countContentsByUserId(userId);

    const totalPages = Math.ceil(totalContents / limit);

    return res.json({
      contents,
      totalPages,
    });
  } catch (error) {
    next(boom.badImplementation('Failed to fetch contents by user id'));
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const emailOrUsername = req.body.emailOrUsername.toLowerCase();
    const user = await UserService.findByEmailOrUsername(
      emailOrUsername,
      emailOrUsername,
    );

    if (!user) {
      return next(boom.unauthorized("The user doesn't exists"));
    }

    // Verify the password
    const rightPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!rightPassword) {
      return next(boom.unauthorized('Unauthorized'));
    }

    responseWithJWT(res, user);
  } catch (error) {
    next(boom.badImplementation('Failed to sign in'));
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.findByEmailOrUsername(
      req.body.email.toLowerCase(),
      req.body.username.toLowerCase(),
    );

    if (user) {
      return next(boom.badRequest('The user already exists'));
    }

    req.body.password = await bcrypt.hash(req.body.password, bcryptSaltRound);

    const newUser = await UserService.create(req.body as IUser);

    responseWithJWT(res, newUser, 201);
  } catch (error) {
    next(boom.badImplementation('Failed to create user'));
  }
};

function responseWithJWT(res: Response, user: Partial<IUser>, status = 200) {
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      userType: user.userType,
    },
    process.env.JWT_SECRET!,
  );

  return res.status(status).json({ token: `Bearer ${token}` });
}

export default {
  findAll,
  findContentsByUserId,
  signIn,
  signUp,
};
