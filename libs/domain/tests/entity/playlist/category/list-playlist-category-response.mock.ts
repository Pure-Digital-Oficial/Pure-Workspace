import { faker } from '@faker-js/faker';
import { ListPlaylistCategoryReponseDto } from '../../../../src';
import { PlaylistCategoryMock } from './playlist-category.mock';

export const ListPlaylistCategoryReponseMock: ListPlaylistCategoryReponseDto = {
  categories: [PlaylistCategoryMock],
  filteredTotal: parseInt(`${faker.number.bigInt}`),
  total: parseInt(`${faker.number.bigInt}`),
  totalPages: parseInt(`${faker.number.bigInt}`),
};
