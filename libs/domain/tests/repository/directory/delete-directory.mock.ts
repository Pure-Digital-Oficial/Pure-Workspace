import { DeleteDirectoryDto, DeleteDirectoryRepository } from '../../../src';

export class DeleteDirectoryRepositoryMock
  implements DeleteDirectoryRepository
{
  inputMock = {} as DeleteDirectoryDto;
  async delete(input: DeleteDirectoryDto): Promise<void> {
    this.inputMock = input;
  }
}
