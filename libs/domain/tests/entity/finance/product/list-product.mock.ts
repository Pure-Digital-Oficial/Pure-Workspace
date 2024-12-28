import { faker } from '@faker-js/faker';
import { ListProductResponseDto } from '../../../../src';
import { ProductMock } from './product.mock';

export const ListProductMock: ListProductResponseDto = {
  total: faker.number.int(),
  totalPages: faker.number.int(),
  filteredTotal: faker.number.int(),
  products: [ProductMock],
};
