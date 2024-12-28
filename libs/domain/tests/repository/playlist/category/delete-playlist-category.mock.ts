import { DeletePlaylistCategoryRepository } from '../../../../src';

export class DeletePlaylistCategoryRepositoryMock
  implements DeletePlaylistCategoryRepository
{
  input = '';
  async delete(id: string): Promise<void> {
    this.input = id;
  }
}
