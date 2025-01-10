import { EditMediaPostDto, EditMediaPostRepository } from '../../../../../src';
import { MediaPostMock } from '../../../../entity';

export class EditMediaPostRepositoryMock implements EditMediaPostRepository {
  inputMock = {} as EditMediaPostDto;
  async edit(input: EditMediaPostDto): Promise<string> {
    this.inputMock = input;
    return MediaPostMock.id;
  }
}
