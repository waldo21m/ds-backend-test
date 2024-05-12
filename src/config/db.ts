import mongoose, { type Mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_DATABASE || 'ds_express';
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const connectionString =
  dbUsername && dbPassword
    ? `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
    : `mongodb://${dbHost}:${dbPort}/${dbName}`;

class MongoDatabase {
  private static instance: Mongoose | null = null;

  private constructor() {}

  public static async getInstance(): Promise<Mongoose> {
    if (!this.instance) {
      this.instance = await mongoose.connect(connectionString);
      console.log('Conectado a MongoDB');
    }

    return this.instance;
  }

  public static async disconnect(): Promise<void> {
    if (this.instance) {
      await mongoose.disconnect();
      this.instance = null;
      console.log('Desconectado de MongoDB');
    }
  }
}

export default MongoDatabase;
