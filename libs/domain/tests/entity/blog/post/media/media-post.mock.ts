import { faker } from '@faker-js/faker';
import { MediaPostResponseDto } from '../../../../../src';

export const MediaPostMock: MediaPostResponseDto = {
  id: faker.string.uuid(),
  content: faker.string.alpha(4),
  name: faker.string.alpha(4),
  createdAt: faker.date.anytime(),
  createdBy: faker.string.uuid(),
  thumbnail: faker.string.alpha(4),
  updatedAt: faker.date.anytime(),
  updatedBy: faker.string.uuid(),
  url: faker.string.alpha(4),
};
