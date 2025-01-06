import { ListPostsResponseDto } from '../../../../src';
import { faker } from '@faker-js/faker';
import { PostMock } from './post.mock';

export const ListPostResponseMock: ListPostsResponseDto = {
  total: faker.number.int(),
  filteredTotal: faker.number.int(),
  totalPages: faker.number.int(),
  posts: [PostMock],
};
