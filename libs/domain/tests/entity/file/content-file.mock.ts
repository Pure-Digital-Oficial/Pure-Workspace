import { faker } from '@faker-js/faker';
import { ContentFile } from '../../../src';

export const ContentFileMock: ContentFile = {
  id: faker.string.uuid(),
  fileName: faker.string.alpha(3),
  format: faker.string.alpha(3),
  originalName: faker.string.alpha(3),
  path: faker.string.alpha(3),
  size: faker.string.alpha(3),
  uploadDate: new Date(faker.date.weekday()),
  created_by: faker.string.alpha(3),
};
