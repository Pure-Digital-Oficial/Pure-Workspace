import { faker } from '@faker-js/faker';
import { ListSchedulesReponseDto } from '../../../src';
import { SchedulingMock } from './scheduling.mock';

export const ListSchedulesReponseMock: ListSchedulesReponseDto = {
  schedules: [SchedulingMock],
  filteredTotal: parseInt(`${faker.number.bigInt}`),
  total: parseInt(`${faker.number.bigInt}`),
  totalPages: parseInt(`${faker.number.bigInt}`),
};
