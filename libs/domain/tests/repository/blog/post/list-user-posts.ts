import {
  ListUserPostsDto,
  ListPostsResponseDto,
  ListUserPostsRepository,
} from '../../../../src';
import { ListPostResponseMock } from '../../../entity/blog/post';

export class ListUserPostsRepositoryMock implements ListUserPostsRepository {
  inputMock = {} as ListUserPostsDto;
  async list(input: ListUserPostsDto): Promise<ListPostsResponseDto> {
    this.inputMock = input;
    return ListPostResponseMock;
  }
}
