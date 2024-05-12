import dotenv from 'dotenv';
import { Router } from 'express';
import userRoutes from './user.routes';

dotenv.config();
const router = Router();

const prefix = `${process.env.APP_URI}${process.env.APP_VERSION}`;

router.use(prefix + '/users', userRoutes);

export default router;
