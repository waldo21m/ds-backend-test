import { Router } from 'express';
import contentTypeController from '../controllers/contentType.controller';
import authenticateJWT from '../middlewares/authenticateJWT.middleware';
import { validationHandler } from '../middlewares/validationHandler.middleware';
import { createSchema } from '../schemas/contentType.schema';
import { queryParamsCheckerMiddleware } from '../middlewares/queryParamsChecker.middleware';

const router = Router();

router.get('/', contentTypeController.findAll);
router.get('/:contentTypeId/topics', contentTypeController.findTopicsByContentTypeId);
router.get(
  '/:contentTypeId/contents',
  queryParamsCheckerMiddleware({ page: false, limit: false }),
  contentTypeController.findContentsByContentTypeId,
);
router.get(
  '/:contentTypeId/topics/:topicId/contents',
  queryParamsCheckerMiddleware({ page: false, limit: false }),
  contentTypeController.findContentsByContentTypeIdAndTopicId,
);
router.post('/', authenticateJWT, validationHandler(createSchema), contentTypeController.create);

export default router;
