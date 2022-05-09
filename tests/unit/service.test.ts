import { jest } from '@jest/globals';

import { recommendationService } from '../../src/services/recommendationsService.js';
import { recommendationRepository } from '../../src/repositories/recommendationRepository.js';

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Recommendation Service', () => {
  it('should return 409 when trying to insert video with same name', async () => {
    const validRecommendation = {
      id: 20,
      name: '20 Valid Name',
      youtubeLink: 'https://youtu.be/5cZWgJ8Dpkc',
      score: 20,
    };

    jest.spyOn(recommendationRepository, 'findByName').mockResolvedValue(validRecommendation);

    expect(async () => {
      await recommendationService.insert(
        {
          name: validRecommendation.name,
          youtubeLink: validRecommendation.youtubeLink,
        },
      );
    }).rejects.toEqual({
      message: 'Recommendations names must be unique',
      type: 'conflict',
    });
  });
});
