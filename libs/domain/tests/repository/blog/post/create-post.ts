import { CreatePostDto, CreatePostRepository } from '../../../../src';
import { PostMock } from '../../../entity/blog/post/post.mock';

export class CreatePostRepositoryMock implements CreatePostRepository {
  inputMock = {} as CreatePostDto;
  async create(input: CreatePostDto): Promise<string> {
    this.inputMock = input;
    return PostMock.id;
  }
}
