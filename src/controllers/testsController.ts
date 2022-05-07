import { Request, Response } from 'express';
import { testsService } from '../services/testsServices.js';

async function resetDatabase(req: Request, res: Response) {
  await testsService.reset();

  res.sendStatus(200);
}

export const testsController = {
  resetDatabase,
};
