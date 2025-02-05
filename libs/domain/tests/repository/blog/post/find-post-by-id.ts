import { FindPostByIdRepository, PostResponseDto } from '../../../../src';
import { PostMock } from '../../../entity';

export class FindPostByIdRepositoryMock implements FindPostByIdRepository {
  inputMock = '';
  async find(id: string): Promise<PostResponseDto> {
    this.inputMock = id;
    return PostMock;
  }
}
