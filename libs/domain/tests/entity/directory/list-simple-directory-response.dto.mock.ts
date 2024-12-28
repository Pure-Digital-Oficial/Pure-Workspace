import { faker } from '@faker-js/faker';
import { ListSimpleDirectoryResponseDto } from '../../../src';
import { DirectoryMock } from './directory.mock';

export const ListSimpleDirectoryResponseDtoMock: ListSimpleDirectoryResponseDto =
  {
    directories: [DirectoryMock],
    filteredTotal: faker.number.int(),
    total: faker.number.int(),
    totalPages: faker.number.int(),
  };
