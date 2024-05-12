import request from 'supertest';
import dotenv from 'dotenv';
import app from '../index';
import * as db from './db';
import * as UserService from '../services/user.service';
import bcrypt from 'bcrypt';
import { UserTypes } from '../utils/userTypes.enum';

dotenv.config();

jest.mock('../services/user.service');

const prefix = `${process.env.APP_URI}${process.env.APP_VERSION}`;

describe('User router /users', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  it('GET / Find all users', async () => {
    const response = await request(app).get(prefix + '/users');
    expect(response.status).toBe(200);
  });

  it('GET / Find all users - Should handle errors', async () => {
    (UserService.findAll as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to fetch users');
    });

    const res = await request(app).get(prefix + '/users');

    expect(res.statusCode).toEqual(500);

    expect(res.body).toEqual({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
    });
  });

  it('POST /signIn Authenticate a user', async () => {
    const mockUser = {
      username: 'testing01',
      email: 'test@mail.com',
      password: '123456789',
      userType: UserTypes.Reader,
    };

    (UserService.findByEmailOrUsername as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockUser),
    );

    const bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const res = await request(app)
      .post(prefix + '/users/signIn')
      .send({
        emailOrUsername: mockUser.email,
        password: mockUser.password,
      });

    expect(res.statusCode).toEqual(200);

    expect(res.body.token).toBeDefined();
  });

  it('POST /signIn Authenticate a user - Should return an error if the user does not exist', async () => {
    const mockUser = {
      username: 'testing01',
      email: 'test@mail.com',
      password: '123456789',
      userType: UserTypes.Reader,
    };
  
    (UserService.findByEmailOrUsername as jest.Mock).mockImplementation(() =>
      Promise.resolve(null),
    );
  
    const res = await request(app)
      .post(prefix + '/users/signIn')
      .send({
        emailOrUsername: mockUser.email,
        password: mockUser.password,
      });
  
    expect(res.statusCode).toEqual(401);
  
    expect(res.body).toEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: "The user doesn't exists",
    });
  });
  
  it('POST /signIn Authenticate a user - Should return an error if the password is incorrect', async () => {
    const mockUser = {
      username: 'testing01',
      email: 'test@mail.com',
      password: 'wrongpassword',
      userType: UserTypes.Reader,
    };
  
    (UserService.findByEmailOrUsername as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockUser),
    );

    const bcryptCompare = jest.fn().mockResolvedValue(false);
    (bcrypt.compare as jest.Mock) = bcryptCompare;
  
    const res = await request(app)
      .post(prefix + '/users/signIn')
      .send({
        emailOrUsername: mockUser.email,
        password: mockUser.password,
      });
  
    expect(res.statusCode).toEqual(401);
  
    expect(res.body).toEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
    });
  });
  
  it('POST /signIn Authenticate a user - Should handle errors', async () => {
    const mockUser = {
      username: 'testing01',
      email: 'test@mail.com',
      password: '123456789',
      userType: UserTypes.Reader,
    };
  
    (UserService.findByEmailOrUsername as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to sign in');
    });
  
    const res = await request(app)
      .post(prefix + '/users/signIn')
      .send({
        emailOrUsername: mockUser.email,
        password: mockUser.password,
      });
  
    expect(res.statusCode).toEqual(500);
  
    expect(res.body).toEqual({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
    });
  });

  it('POST /signUp Create a new user', async () => {
    const mockUser = {
      username: 'testing01',
      email: 'test@mail.com',
      password: '123456789',
      userType: UserTypes.Reader,
    };

    (UserService.findByEmailOrUsername as jest.Mock).mockImplementation(() =>
      Promise.resolve(null),
    );

    (UserService.create as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockUser),
    );

    const res = await request(app)
      .post(prefix + '/users/signUp')
      .send(mockUser);

    expect(res.statusCode).toEqual(201);

    expect(res.body.token).toBeDefined();
  });

  it('POST /signUp Create a new user - Should return an error if the user schema is invalid', async () => {
    const mockUser = {
      username: 'testing01',
      email: 'test@mail.com',
      password: '123456789',
      userType: 'Anything',
    };

    const res = await request(app)
      .post(prefix + '/users/signUp')
      .send(mockUser);

    expect(res.statusCode).toEqual(400);

    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'ValidationError: "userType" must be one of [Lector, Creador]',
    });
  });

  it('POST /signUp Create a new user - Should return an error if the user already exists', async () => {
    const mockUser = {
      username: 'testing01',
      email: 'test@mail.com',
      password: '123456789',
      userType: UserTypes.Reader,
    };

    (UserService.findByEmailOrUsername as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockUser),
    );

    const res = await request(app)
      .post(prefix + '/users/signUp')
      .send(mockUser);

    expect(res.statusCode).toEqual(400);

    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'The user already exists',
    });
  });

  it('POST /signUp Create a new user - Should handle errors', async () => {
    const mockUser = {
      username: 'testing01',
      email: 'test@mail.com',
      password: '123456789',
      userType: UserTypes.Reader,
    };

    (UserService.findByEmailOrUsername as jest.Mock).mockImplementation(() =>
      Promise.resolve(null),
    );

    (UserService.create as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to create user');
    });

    const res = await request(app)
      .post(prefix + '/users/signUp')
      .send(mockUser);

    expect(res.statusCode).toEqual(500);

    expect(res.body).toEqual({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
    });
  });
});
