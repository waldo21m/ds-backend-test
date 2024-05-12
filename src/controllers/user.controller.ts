import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import { IUser } from '../interfaces/User.interface';
import * as UserService from '../services/user.service';

dotenv.config();

const bcryptSaltRound = process.env.BCRYPT_SALT_ROUNDS ? +process.env.BCRYPT_SALT_ROUNDS : 10;

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

const create = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserService.findByEmailOrUsername(req.body.email.toLowerCase(), req.body.username.toLowerCase());

  if (user) {
    return next(boom.badRequest("The user already exists"));
  }

  req.body.password = await bcrypt.hash(req.body.password, bcryptSaltRound);

  try {
    const newUser = await UserService.create(req.body as IUser);

    return res.status(201).json(newUser);
  } catch (error) {
    next(boom.badImplementation('Failed to create user'));
  }
};

export default {
  findAll,
  create,
};
