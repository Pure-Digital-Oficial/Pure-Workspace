import { faker } from '@faker-js/faker';
import { PlaylistResponseDto } from '../../../src';

export const PlaylistResponseMock: PlaylistResponseDto = {
  id: faker.string.uuid(),
  category: {
    id: faker.string.uuid(),
    name: faker.string.alpha(3),
  },
  created_at: faker.date.anytime(),
  created_by: faker.string.alpha(3),
  name: faker.string.alpha(3),
};
