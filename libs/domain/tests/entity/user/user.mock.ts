import { User } from '../../../src/lib/entity/user';
import { faker } from '@faker-js/faker';
import { authMock } from './auth.mock';

export const userMock: User = {
  userId: faker.string.uuid(),
  name: faker.string.alpha(3),
  nickname: faker.string.alpha(3),
  birthDate: faker.date.birthdate(),
  type: 'ADMIN',
  auth: [authMock],
};
