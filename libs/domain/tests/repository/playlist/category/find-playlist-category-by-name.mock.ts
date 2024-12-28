import {
  FindPlaylistCategoryByNameDto,
  FindPlaylistCategoryByNameRepository,
  PlaylistCategory,
} from '../../../../src';

export class FindPlaylistCategoryByNameRepositoryMock
  implements FindPlaylistCategoryByNameRepository
{
  inputMock = {} as FindPlaylistCategoryByNameDto;
  returnMock = {} as PlaylistCategory;
  async find(input: FindPlaylistCategoryByNameDto): Promise<PlaylistCategory> {
    this.inputMock = input;
    return this.returnMock;
  }
}
