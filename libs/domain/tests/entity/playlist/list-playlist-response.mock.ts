import { faker } from '@faker-js/faker';
import { ListPlaylistResponseDto } from '../../../src';
import { PlaylistMock } from './playlist.mock';

export const ListPlaylistResponseMock: ListPlaylistResponseDto = {
  playlists: [PlaylistMock],
  filteredTotal: parseInt(`${faker.number.bigInt}`),
  total: parseInt(`${faker.number.bigInt}`),
  totalPages: parseInt(`${faker.number.bigInt}`),
};
