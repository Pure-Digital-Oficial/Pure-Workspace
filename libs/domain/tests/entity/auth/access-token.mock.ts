import { faker } from '@faker-js/faker';
import { AccessToken } from '../../../src';

export const AccessTokenMock: AccessToken = {
  token: faker.string.uuid(),
};
