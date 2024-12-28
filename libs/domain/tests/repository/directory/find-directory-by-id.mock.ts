import { Directory, FindDirectoryByIdRepository } from '../../../src';
import { DirectoryMock } from '../../entity';

export class FindDirectoryByIdRespositoryMock
  implements FindDirectoryByIdRepository
{
  async find(id: string): Promise<Directory> {
    return DirectoryMock;
  }
}
