import { jest } from '@jest/globals';

import { recommendationService } from '../../src/services/recommendationsService.js';
import { recommendationRepository } from '../../src/repositories/recommendationRepository.js';

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Recommendation Service', () => {
  it('should throw "conflict error" 409 when trying to insert video with same name', async () => {
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

  it('should throw "not found" error when searching for a non-existent song id', async () => {
    jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);

    const invalidId = 99;

    expect(async () => {
      await recommendationService.getById(invalidId);
    }).rejects.toEqual({
      message: '',
      type: 'not_found',
    });
  });

  it('should remove a recommendation when downvoted to score < -5', async () => {
    const recommendation = {
      id: 55,
      name: '-5 Valid Name',
      youtubeLink: 'https://youtu.be/5cZWgJ8Dpkc',
      score: -5,
    };

    jest.spyOn(recommendationRepository, 'find').mockResolvedValue(recommendation);

    jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue({
      ...recommendation,
      score: -6,
    });

    const removeRecommendation = jest.spyOn(recommendationRepository, 'remove').mockResolvedValue(null);

    await recommendationService.downvote(recommendation.id);

    expect(removeRecommendation).toBeCalledWith(recommendation.id);
  });
});
