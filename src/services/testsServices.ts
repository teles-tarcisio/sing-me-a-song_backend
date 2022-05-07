import { testsRepository } from '../repositories/testsRepository.js';

async function reset() {
  await testsRepository.resetDb();
}

export const testsService = {
  reset,
};
