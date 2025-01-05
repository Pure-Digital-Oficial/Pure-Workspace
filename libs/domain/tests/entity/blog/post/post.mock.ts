import { faker } from '@faker-js/faker';
import { PostResponseDto } from '../../../../src';

export const PostMock: PostResponseDto = {
  id: faker.string.uuid(),
  content: faker.string.alpha(3),
  createdAt: faker.date.anytime(),
  createdBy: faker.string.uuid(),
  description: faker.string.alpha(3),
  subTitle: faker.string.alpha(3),
  title: faker.string.alpha(3),
  updatedAt: faker.date.anytime(),
  updatedBy: faker.string.uuid(),
};
