import { EditPlaylistCategoryRepository } from '../../../../src';
import { EditPlaylistCategoryDto } from '../../../../src/lib/dto/request/playlist/category/edit-playlist-category.dto';

export class EditPlaylistCategoryRepositoryMock
  implements EditPlaylistCategoryRepository
{
  inputMock = {} as EditPlaylistCategoryDto;
  async edit(input: EditPlaylistCategoryDto): Promise<void> {
    this.inputMock = input;
  }
}
