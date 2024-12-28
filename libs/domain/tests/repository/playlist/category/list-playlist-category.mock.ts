import {
  ListPlaylistCategoryDto,
  ListPlaylistCategoryReponseDto,
  ListPlaylistCategoryRepository,
} from '../../../../src';
import { ListPlaylistCategoryReponseMock } from '../../../entity';
export class ListPlaylistCategoryRepositoryMock
  implements ListPlaylistCategoryRepository
{
  inputMock = {} as ListPlaylistCategoryDto;
  async list(
    input: ListPlaylistCategoryDto
  ): Promise<ListPlaylistCategoryReponseDto> {
    this.inputMock = input;
    return ListPlaylistCategoryReponseMock;
  }
}
