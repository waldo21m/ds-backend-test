import { Router } from 'express';
import contentController from '../controllers/content.controller';
import authenticateJWT from '../middlewares/authenticateJWT.middleware';
import { validationHandler } from '../middlewares/validationHandler.middleware';
import { createSchema, updateSchema } from '../schemas/content.schema';
import { queryParamsCheckerMiddleware } from '../middlewares/queryParamsChecker.middleware';

const router = Router();

router.get('/', queryParamsCheckerMiddleware({ page: false, limit: false, search: false }), contentController.findAll);
router.get('/:contentId', authenticateJWT, contentController.findById);
router.post('/', authenticateJWT, validationHandler(createSchema), contentController.create);
router.put('/:contentId', authenticateJWT, validationHandler(updateSchema), contentController.update);
router.delete('/:contentId', authenticateJWT, contentController.softDelete);
router.delete('/:contentId/destroy', authenticateJWT, contentController.destroy);

export default router;
