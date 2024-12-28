import {
  Directory,
  FindDirectoryByNameDto,
  FindDirectoryByNameRepository,
} from '../../../src';

export class FindDirectoryByNameRepositoryMock
  implements FindDirectoryByNameRepository
{
  inputMock = {} as FindDirectoryByNameDto;
  async find(input: FindDirectoryByNameDto): Promise<Directory> {
    this.inputMock = input;
    const directory = {} as Directory;
    return directory;
  }
}
