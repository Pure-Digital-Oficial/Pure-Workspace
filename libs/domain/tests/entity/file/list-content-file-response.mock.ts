import { faker } from '@faker-js/faker';
import { ListContentFileResponseDto } from '../../../src';
import { ContentFileMock } from './content-file.mock';

export const ListContentFileReponseMock: ListContentFileResponseDto = {
  total: faker.number.int(),
  totalPages: faker.number.int(),
  files: [ContentFileMock],
};
