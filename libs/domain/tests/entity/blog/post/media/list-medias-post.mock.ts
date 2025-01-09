import { faker } from '@faker-js/faker';
import { ListMediasPostResponseDto } from '../../../../../src';
import { MediaPostMock } from './media-post.mock';

export const ListMediasPostResponseMock: ListMediasPostResponseDto = {
  total: faker.number.int(),
  filteredTotal: faker.number.int(),
  totalPages: faker.number.int(),
  medias: [MediaPostMock],
};
