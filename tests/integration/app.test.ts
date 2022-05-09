/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/database.js';
import { main as seedDatabase } from '../../prisma/seed.js';

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

  it('should successfully downvote a video', async () => {
    const { id, score } = await prisma.recommendation.findUnique({
      where: { name: newMusic.name },
    });

    const result = await supertest(app).post(`/recommendations/${id}/downvote`);
    expect(result.status).toEqual(200);
    const lastDownvoted = await prisma.recommendation.findUnique({
      where: { name: newMusic.name },
    });
    expect(lastDownvoted.score).toEqual(score - 1);
  });

  it('should succesfully get the "top 10" recommendations', async () => {
    await seedDatabase()
      .catch((e) => {
        console.log(e);
        process.exit(1);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    const topTen = await supertest(app).get('/recommendations');
    expect(topTen.body.length).toEqual(10);
  });

  it('should successfully get recommendation by id', async () => {
    const targetId = 9;
    const recommendation = await supertest(app).get(`/recommendations/${targetId}`);
    expect(recommendation.body.id === targetId);
    expect(recommendation.body.score > 1);
  });

  it('should get Y recommendations sorted by score', async () => {
    const quantity = 6;
    const result = await supertest(app).get(`/recommendations/top/${quantity}`);
    expect(result.body.length).toEqual(6);
    console.log(result.body);

    let sorted = true;
    const targetArray = result.body;
    for (let i = 0; i < targetArray.length - 1; i++) {
      if (targetArray[i].score < targetArray[i + 1].score) {
        sorted = false;
        break;
      }
    };
    expect(sorted).toEqual(true);
  });

  it.todo('get recommendation randomly');
});
