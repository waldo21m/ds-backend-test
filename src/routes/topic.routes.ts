import { Router } from 'express';
import topicController from '../controllers/topic.controller';
import authenticateJWT from '../middlewares/authenticateJWT.middleware';
import { validationHandler } from '../middlewares/validationHandler.middleware';
import { createSchema } from '../schemas/topic.schema';
import { queryParamsCheckerMiddleware } from '../middlewares/queryParamsChecker.middleware';

const router = Router();

router.get('/', queryParamsCheckerMiddleware({ search: false }), topicController.findAll);
router.get(
  '/:topicId/contents',
  queryParamsCheckerMiddleware({ page: false, limit: false }),
  topicController.findContentsByTopicId,
);
router.post('/', authenticateJWT, validationHandler(createSchema), topicController.create);

export default router;
