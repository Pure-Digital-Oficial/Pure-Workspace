import {
  ListPostsDto,
  ListPostsRepository,
  ListPostsResponseDto,
} from '../../../../src';
import { ListPostResponseMock } from '../../../entity/blog/post';

export class ListPostsRepositoryMock implements ListPostsRepository {
  inputMock = {} as ListPostsDto;
  async list(input: ListPostsDto): Promise<ListPostsResponseDto> {
    this.inputMock = input;
    return ListPostResponseMock;
  }
}
