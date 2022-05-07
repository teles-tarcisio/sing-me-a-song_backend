import { testsService } from '../services/testsServices.js';

async function resetDatabase() {
  await testsService.reset();
}

export const testsController = {
  resetDatabase,
};
