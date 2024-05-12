import { Router } from 'express';
import userController from '../controllers/user.controller';
import { validationHandler } from '../middlewares/validationHandler';
import { createUserSchema } from '../schemas/user.schema';
import { queryParamsCheckerMiddleware } from '../middlewares/queryParamsChecker';

const router = Router();

router.get('/', queryParamsCheckerMiddleware({"page": false, "limit": false}), userController.findAll);
router.post('/', validationHandler(createUserSchema), userController.create);

export default router;
