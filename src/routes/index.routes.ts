import dotenv from 'dotenv';
import { Router } from 'express';
import userRoutes from './user.routes';
import blacklistedTokenController from '../controllers/blacklistedToken.controller';
import healthController from '../controllers/healthController.controller';

dotenv.config();
const router = Router();

const prefix = `${process.env.APP_URI}${process.env.APP_VERSION}`;

router.use(prefix + '/users', userRoutes);
router.post(prefix + '/logout', blacklistedTokenController.logout);
router.get(prefix + '/health', healthController.healthCheck);

export default router;
