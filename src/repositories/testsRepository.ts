import { prisma } from '../database.js';

async function resetDb() {
  await prisma.recommendation.deleteMany();
  console.log(await prisma.recommendation.findMany(), '<<<empty?');
}

export const testsRepository = {
  resetDb,
};
