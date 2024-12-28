import { DeleteFileByNameRepository } from '../../../src';

export class DeleteFileByNameRepositoryMock
  implements DeleteFileByNameRepository
{
  inputMock = '';
  async delete(name: string): Promise<void> {
    this.inputMock = name;
  }
}
