import { Router } from 'express';
import contentTypeController from '../controllers/contentType.controller';
import authenticateJWT from '../middlewares/authenticateJWT.middleware';
import { validationHandler } from '../middlewares/validationHandler.middleware';
import { createSchema } from '../schemas/contentType.schema';

const router = Router();

router.get('/', contentTypeController.findAll);
router.post('/', authenticateJWT, validationHandler(createSchema), contentTypeController.create);

export default router;
