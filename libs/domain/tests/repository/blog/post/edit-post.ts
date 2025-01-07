import { EditPostRepository, EditPostDto } from '../../../../src';
import { PostMock } from '../../../entity';

export class EditPostRepositoryMock implements EditPostRepository {
  inputMock = {} as EditPostDto;
  async edit(input: EditPostDto): Promise<string> {
    this.inputMock = input;
    return PostMock.id;
  }
}
