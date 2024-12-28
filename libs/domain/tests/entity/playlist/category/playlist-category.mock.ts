import { faker } from '@faker-js/faker';
import { PlaylistCategory } from '../../../../src';

export const PlaylistCategoryMock: PlaylistCategory = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
  description: faker.string.alpha(3),
  created_at: new Date(faker.date.weekday()),
  created_by: faker.string.alpha(3),
};
