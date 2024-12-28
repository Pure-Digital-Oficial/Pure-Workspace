import { DeletePlaylistRepoistory } from '../../../src';

export class DeletePlaylistRepositoryMock implements DeletePlaylistRepoistory {
  inputMock = '';
  async delete(id: string): Promise<void> {
    this.inputMock = id;
  }
}
