import { faker } from '@faker-js/faker';
import { Scheduling } from '../../../src';
import { userMock } from '../user/user.mock';

export const SchedulingMock: Scheduling = {
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  startTime: faker.date.recent().toISOString(),
  endTime: faker.date.recent().toISOString(),
  lopping: faker.datatype.boolean(),
  priority: `${faker.number.int({
    min: 1,
    max: 10,
  })}`,
  createBy: userMock.nickname,
  createdAt: faker.date.recent(),
};
