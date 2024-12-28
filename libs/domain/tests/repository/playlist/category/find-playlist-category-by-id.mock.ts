import {
  FindPlaylistCategoryByIdRepository,
  PlaylistCategory,
} from '../../../../src';
import { PlaylistCategoryMock } from '../../../entity';

export class FindPlaylistCategoryByIdRepositoryMock
  implements FindPlaylistCategoryByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<PlaylistCategory> {
    this.inputMock = id;
    return PlaylistCategoryMock;
  }
}
