import { CreatePostInDatabaseDto, CreatePostRepository } from '../../../../src';
import { PostMock } from '../../../entity/blog/post/post.mock';

export class CreatePostRepositoryMock implements CreatePostRepository {
  inputMock = {} as CreatePostInDatabaseDto;
  async create(input: CreatePostInDatabaseDto): Promise<string> {
    this.inputMock = input;
    return PostMock.id;
  }
}
