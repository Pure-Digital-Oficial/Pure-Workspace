import { DeleteFileByPlaylistRepository } from '../../../src';

export class DeleteFileByPlaylistRepositoryMock
  implements DeleteFileByPlaylistRepository
{
  inputMock = '';
  async delete(idPlaylist: string): Promise<void> {
    this.inputMock = idPlaylist;
  }
}
