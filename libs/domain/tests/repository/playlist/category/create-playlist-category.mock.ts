import {
  CreatePlaylistCategoryDto,
  CreatePlaylistCategoryRepository,
} from '../../../../src';
import { PlaylistCategoryMock } from '../../../entity';

export class CreatePlaylistCategoryRepositoryMock
  implements CreatePlaylistCategoryRepository
{
  inputMock = {} as CreatePlaylistCategoryDto;
  async create(input: CreatePlaylistCategoryDto): Promise<string> {
    this.inputMock = input;
    return PlaylistCategoryMock.id;
  }
}
