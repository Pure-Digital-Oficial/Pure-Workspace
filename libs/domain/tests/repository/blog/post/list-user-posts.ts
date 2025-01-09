import {
  ListPostsDto,
  ListPostsResponseDto,
  ListUserPostsRepository,
} from '../../../../src';
import { ListPostResponseMock } from '../../../entity/blog/post';

export class ListUserPostsRepositoryMock implements ListUserPostsRepository {
  inputMock = {} as ListPostsDto;
  async list(input: ListPostsDto): Promise<ListPostsResponseDto> {
    this.inputMock = input;
    return ListPostResponseMock;
  }
}
