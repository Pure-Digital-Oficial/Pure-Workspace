import {
  MoveFileToDirectoryDto,
  MoveFileToDirectoryRepository,
} from '../../../src';

export class MoveFileToDirectoryRepositoryMock
  implements MoveFileToDirectoryRepository
{
  inputMock: MoveFileToDirectoryDto = {} as MoveFileToDirectoryDto;
  async move(input: MoveFileToDirectoryDto): Promise<void> {
    this.inputMock = input;
  }
}
