import { faker } from '@faker-js/faker';
import { Playlist } from '../../../src';
import { PlaylistCategoryMock } from './category/playlist-category.mock';
import { userMock } from '../user/user.mock';

export const PlaylistMock: Playlist = {
  id: faker.string.uuid(),
  created_at: faker.date.anytime(),
  category: PlaylistCategoryMock.name,
  name: faker.string.alpha(3),
  created_by: userMock.nickname,
};
