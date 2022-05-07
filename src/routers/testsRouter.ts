import { Router } from 'express';
import { testsController } from '../controllers/testsController.js';

const testsRouter = Router();

testsRouter.post('/tests/reset-database', testsController.resetDatabase);

export default testsRouter;
