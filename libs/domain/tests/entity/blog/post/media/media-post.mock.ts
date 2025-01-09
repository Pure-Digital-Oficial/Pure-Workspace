import { faker } from '@faker-js/faker';
import { MediaPostResponseDto } from '../../../../../src';

export const MediaPostMock: MediaPostResponseDto = {
  id: faker.string.uuid(),
};
