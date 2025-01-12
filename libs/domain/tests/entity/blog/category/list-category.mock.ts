import { faker } from '@faker-js/faker';
import { ListCategoryResponseDto } from '../../../../src';
import { CategoryMock } from './category.mock';

export const ListCategoryResponseMock: ListCategoryResponseDto = {
  total: faker.number.int(),
  filteredTotal: faker.number.int(),
  totalPages: faker.number.int(),
  categories: [CategoryMock],
};
