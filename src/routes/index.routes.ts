import dotenv from 'dotenv';
import { Router } from 'express';
import userRoutes from './user.routes';
import contentTypeRoutes from './contentType.routes';
import topicRoutes from './topic.routes';
import contentRoutes from './content.routes';
import authenticateJWT from '../middlewares/authenticateJWT.middleware';
import blacklistedTokenController from '../controllers/blacklistedToken.controller';
import healthController from '../controllers/health.controller';

dotenv.config();

const router = Router();

const prefix = `${process.env.APP_URI}${process.env.APP_VERSION}`;

router.use(prefix + '/users', userRoutes);
router.use(prefix + '/content-types', contentTypeRoutes);
router.use(prefix + '/topics', topicRoutes);
router.use(prefix + '/contents', contentRoutes);
router.get(prefix + '/check-jwt', authenticateJWT, blacklistedTokenController.checkJWT);
router.post(prefix + '/logout', blacklistedTokenController.logout);
router.get(prefix + '/health', healthController.healthCheck);

export default router;
