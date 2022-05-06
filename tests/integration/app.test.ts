import app from '../../src/app.js';
import supertest from 'supertest';

// beforeEach()

// afterEach()

describe('POST /recommendations', () => {
  it('should successfully send a recommendation given a valid body', async () => {
    const newMusic =  {
      name: "Falamansa - Xote dos Milagres",
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    };

    const result = await supertest(app).post('/recommendations').send(newMusic);
    expect(result.status).toEqual(201);

    // const duplicated = await supertest(app).post('/recommendations').send(newMusic);
    
  });
});

