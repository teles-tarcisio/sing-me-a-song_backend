import { prisma } from '../database.js';

async function resetDb() {
  await prisma.recommendation.deleteMany();
}

export const testsRepository = {
  resetDb,
};
