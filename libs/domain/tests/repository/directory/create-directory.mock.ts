import { CreateDirectoryDto, CreateDirectoryRepository } from '../../../src';
import { DirectoryMock } from '../../entity/directory/directory.mock';

export class CreateDirectoryRepositoryMock
  implements CreateDirectoryRepository
{
  inputMock = {} as CreateDirectoryDto;

  async create(input: CreateDirectoryDto): Promise<string> {
    this.inputMock = input;
    return DirectoryMock.id;
  }
}
