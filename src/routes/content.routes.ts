import { Router } from 'express';
import contentController from '../controllers/content.controller';
import authenticateJWT from '../middlewares/authenticateJWT.middleware';
import { validationHandler } from '../middlewares/validationHandler.middleware';
import { createSchema } from '../schemas/content.schema';
import { queryParamsCheckerMiddleware } from '../middlewares/queryParamsChecker.middleware';

const router = Router();

router.get('/', queryParamsCheckerMiddleware({ page: false, limit: false, search: false }), contentController.findAll);
router.post('/', authenticateJWT, validationHandler(createSchema), contentController.create);

export default router;
