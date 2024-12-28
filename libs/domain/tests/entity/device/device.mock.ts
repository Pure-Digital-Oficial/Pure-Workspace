import { faker } from '@faker-js/faker';
import { Device } from '../../../src';

export const DeviceMock: Device = {
  id: faker.string.uuid(),
  name: faker.string.alpha(3),
  createdAt: faker.date.past(),
  createdBy: faker.string.alpha(3),
};
