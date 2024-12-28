import { faker } from '@faker-js/faker';
import { App } from '../../../src';

export const appMock: App = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
};
