import { Router } from 'express';
import userController from '../controllers/user.controller';
import { validationHandler } from '../middlewares/validationHandler.middleware';
import { signInSchema, signUpSchema } from '../schemas/user.schema';
import { queryParamsCheckerMiddleware } from '../middlewares/queryParamsChecker.middleware';

const router = Router();

router.get(
  '/',
  queryParamsCheckerMiddleware({ page: false, limit: false }),
  userController.findAll,
);
router.get(
  '/:userId/contents',
  queryParamsCheckerMiddleware({ page: false, limit: false }),
  userController.findContentsByUserId,
);
router.post('/sign-in', validationHandler(signInSchema), userController.signIn);
router.post('/sign-up', validationHandler(signUpSchema), userController.signUp);

export default router;
