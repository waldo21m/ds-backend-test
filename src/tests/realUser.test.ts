import request from 'supertest';
import dotenv from 'dotenv';
import app, { startServer, stopServer } from '../index';
import MongoDatabase from '../config/db';

dotenv.config();

const prefix = `${process.env.APP_URI}${process.env.APP_VERSION}`

describe('User router /users', () => {
  beforeAll((done) => {
    startServer(done);
  });

  afterAll((done) => {
    MongoDatabase.disconnect().then(() => {
      stopServer(done);
    });
  });

  it('GET / Find all users', async () => {
    const response = await request(app).get(prefix + '/users');
    expect(response.status).toBe(200);
  });
});
