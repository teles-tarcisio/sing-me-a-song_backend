/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/database.js';

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

const newMusic = {
  name: 'Casuarina - Ponto de Vista',
  youtubeLink: 'https://www.youtube.com/watch?v=1dmQmMUdMt8',
};

describe('POST /recommendations', () => {
  it('should successfully insert a recommendation given a valid body', async () => {
    const result = await supertest(app).post('/recommendations').send(newMusic);
    const addedMusic = await prisma.recommendation.findUnique({
      where: { name: newMusic.name },
    });
    console.log(addedMusic);

    expect(result.status).toEqual(201);
    expect(addedMusic).toMatchObject({
      name: newMusic.name,
      youtubeLink: newMusic.youtubeLink,
      score: 0,
    });
  });

  it('should successfully upvote a video', async () => {
    const { id, score } = await prisma.recommendation.findUnique({
      where: { name: newMusic.name },
    });

    const result = await supertest(app).post(`/recommendations/${id}/upvote`);
    expect(result.status).toEqual(200);
    const lastUpvoted = await prisma.recommendation.findUnique({
      where: { name: newMusic.name },
    });
    expect(lastUpvoted.score).toEqual(score + 1);
  });

  it.todo('downvote a recommendation');
  it.todo('get last 10 recommendations');
  it.todo('get recommendation by id');
  it.todo('get X recommendations sorted by score');
  it.todo('get recommendation randomly');
});
