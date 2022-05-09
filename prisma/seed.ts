import { prisma } from '../src/database.js';

const seedArray = [
  {
    name: '01 Casuarina - Ponto de Vista',
    youtubeLink: 'https://www.youtube.com/watch?v=1dmQmMUdMt8',
    score: 1,
  },
  {
    name: '02 Falamansa - Xote dos Milagres',
    youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
    score: 2,
  },
  {
    name: '03 Audioslave: Wide Awake',
    youtubeLink: 'https://youtu.be/zA3pE_cLUdU',
    score: 3,
  },
  {
    name: '04 Barão Vermelho: MTV Ao Vivo',
    youtubeLink: 'https://youtu.be/o6LCGvteAv0',
    score: 4,
  },
  {
    name: '05 Ira! : Tarde Vazia',
    youtubeLink: 'https://youtu.be/9mGlhelzpRs',
    score: 5,
  },
  {
    name: '06 Paralamas do Sucesso: Tendo a Lua',
    youtubeLink: 'https://www.youtube.com/watch?v=N0vs3X328kg',
    score: 6,
  },
  {
    name: '07 Lenine: Leão do Norte',
    youtubeLink: 'https://www.youtube.com/watch?v=MDl5dUcZCEg',
    score: 7,
  },
  {
    name: '08 Skank: Uma Canção é Pra Isso',
    youtubeLink: 'https://youtu.be/tQJluvQ3bmI',
    score: 8,
  },
  {
    name: '09 Capital Inicial: Fátima',
    youtubeLink: 'https://youtu.be/LYJtAvQ2lXk',
    score: 9,
  },
  {
    name: '10 O Rappa: Eu Quero Ver Gol',
    youtubeLink: 'https://youtu.be/5cZWgJ8Dpkc',
    score: 10,
  },
  {
    name: '11 Casuarina: Cabelos Brancos',
    youtubeLink: 'https://www.youtube.com/watch?v=pquMm43WCGE',
    score: 11,
  },
  {
    name: '12 Pitty: Pra Onde Ir',
    youtubeLink: 'https://youtu.be/M6P7ntPQoSc',
    score: 12,
  },
  {
    name: '13 Nando Reis & Os Infernais: Por Onde Andei',
    youtubeLink: 'https://youtu.be/0H5y-GDTrHc',
    score: 13,
  },
];

export async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;

  seedArray.forEach(async (music) => {
    await prisma.recommendation.upsert({
      where: { name: music.name },
      update: {},
      create: {
        name: music.name,
        youtubeLink: music.youtubeLink,
        score: music.score,
      },
    });
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