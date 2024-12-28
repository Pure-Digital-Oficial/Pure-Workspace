import { faker } from '@faker-js/faker';
import { ListDirectoryResponseDto } from '../../../src';
import { DirectoryMock } from './directory.mock';

export const ListDirectoryResponseMock: ListDirectoryResponseDto = {
  directories: [DirectoryMock],
  filteredTotal: parseInt(`${faker.number.bigInt}`),
  total: parseInt(`${faker.number.bigInt}`),
  totalPages: parseInt(`${faker.number.bigInt}`),
};
