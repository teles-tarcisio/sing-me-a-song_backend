import supertest from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/database.js';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /recommendations', () => {
  it('should successfully send a recommendation given a valid body', async () => {
    const newMusic = {
      name: 'Falamansa - Xote dos Milagres',
      youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
    };
    // Casuarina - Ponto de Vista, https://www.youtube.com/watch?v=1dmQmMUdMt8

    const result = await supertest(app).post('/recommendations').send(newMusic);
    expect(result.status).toEqual(201);

    const duplicated = await supertest(app).post('/recommendations').send(newMusic);
    expect(duplicated.status).toEqual(500);
  });
});
