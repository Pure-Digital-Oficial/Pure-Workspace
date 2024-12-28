import { EditDirectoryDto, EditDirectoryRepository } from '../../../src';
import { DirectoryMock } from '../../entity';

export class EditDirectoryRepositoryMock implements EditDirectoryRepository {
  inputMock = {} as EditDirectoryDto;
  async edit(input: EditDirectoryDto): Promise<string> {
    this.inputMock = input;
    return DirectoryMock.id;
  }
}
