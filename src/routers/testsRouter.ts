import { Router } from 'express';
import { testsController } from '../controllers/testsController.js';
import { recommendationController } from '../controllers/recommendationController.js';

const testsRouter = Router();

testsRouter.post('/tests/reset-database', testsController.resetDatabase);
testsRouter.post('/tests/populate-top', recommendationController.insert);

export default testsRouter;
