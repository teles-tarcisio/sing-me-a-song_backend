import supertest from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/database.js';


beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /recommendations', () => {
  it('should successfully insert a recommendation given a valid body', async () => {
    const newMusic = {
      name: 'Casuarina - Ponto de Vista',
      youtubeLink: 'https://www.youtube.com/watch?v=1dmQmMUdMt8',
    };
    
    const result = await supertest(app).post('/recommendations').send(newMusic);
    const addedMusic = await prisma.recommendation.findUnique({
      where: { name: newMusic.name }
    });
    console.log(addedMusic);
    

    expect(result.status).toEqual(201);
    expect(addedMusic.score).toEqual(0);
    // tentar com expect.objectContaining(object)
    

    /*
    const duplicated = await supertest(app).post('/recommendations').send(newMusic);
    expect(duplicated.status).toEqual(500);
    */

  });
});
