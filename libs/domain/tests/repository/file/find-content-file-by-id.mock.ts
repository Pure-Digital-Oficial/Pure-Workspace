import { ContentFile, FindContentFileByIdRepository } from '../../../src';
import { ContentFileMock } from '../../entity';

export class FindContentFileByIdRepositoryMock
  implements FindContentFileByIdRepository
{
  idMock = '';
  async find(id: string): Promise<ContentFile> {
    this.idMock = id;
    return ContentFileMock;
  }
}
