import { faker } from '@faker-js/faker';
import { Directory } from '../../../src';

export const DirectoryMock: Directory = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
};
