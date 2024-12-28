import { Auth } from '../../../src';
import { faker } from '@faker-js/faker';

export const authMock: Auth = {
  authId: faker.string.uuid(),
  userId: faker.string.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  status: 'DEFAULT',
};
