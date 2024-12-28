import { faker } from '@faker-js/faker';
import { UserList } from '../../../src';
import { userMock } from './user.mock';

export const listUserMock: UserList[] = [
  {
    userId: userMock.userId,
    name: faker.string.alpha(3),
    nickname: faker.string.alpha(3),
    birthDate: faker.date.birthdate(),
    email: faker.internet.email(),
    status: 'ACTIVE',
    type: 'ADMIN',
  },
  {
    userId: faker.string.uuid(),
    name: faker.string.alpha(3),
    nickname: faker.string.alpha(3),
    birthDate: faker.date.birthdate(),
    email: faker.internet.email(),
    status: 'ACTIVE',
    type: 'DEFAULT',
  },
];
