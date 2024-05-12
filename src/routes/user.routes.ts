import { Router } from 'express';
import userController from '../controllers/user.controller';
import { validationHandler } from '../middlewares/validationHandler';
import { createUserSchema } from '../schemas/user.schema';

const router = Router();

router.get('/', userController.findAll);
router.post('/', validationHandler(createUserSchema), userController.create);

export default router;
