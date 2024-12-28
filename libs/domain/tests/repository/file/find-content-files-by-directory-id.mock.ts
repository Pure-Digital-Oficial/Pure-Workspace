import {
  ContentFile,
  FindContentFilesByDirectoryIdRepository,
} from '../../../src';
import { ContentFileMock } from '../../entity/file/content-file.mock';

export class FindContentFilesByDirectoryIdRepositoryMock
  implements FindContentFilesByDirectoryIdRepository
{
  inputMock = '';
  async find(id: string): Promise<ContentFile[]> {
    this.inputMock = id;
    return [];
  }
}
