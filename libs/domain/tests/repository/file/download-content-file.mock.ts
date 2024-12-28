import { DownloadContentFileRepository } from '../../../src';

export class DownloadContentFileRepositoryMock
  implements DownloadContentFileRepository
{
  mockInput = '';
  async download(name: string): Promise<string> {
    this.mockInput = name;
    return 'any_url';
  }
}
