import { prisma } from '../src/database.js';

async function main() {
  const newMusic1 = {
    name: 'Casuarina - Ponto de Vista',
    youtubeLink: 'https://www.youtube.com/watch?v=1dmQmMUdMt8',
  };

  const newMusic2 = {
    name: 'Falamansa - Xote dos Milagres',
    youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
  };

  await prisma.recommendation.upsert({
    where: { name: newMusic1.name },
    update: {},
    create: {
      name: newMusic1.name,
      youtubeLink: newMusic1.youtubeLink,
    },
  });

  await prisma.recommendation.upsert({
    where: { name: newMusic2.name },
    update: {},
    create: {
      name: newMusic2.name,
      youtubeLink: newMusic2.youtubeLink,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
