import {
  FindFileInFileToPlaylistDto,
  FindFileInFileToPlaylistRepository,
} from '../../../src';

export class FindFileInFileToPlaylistRepositoryMock
  implements FindFileInFileToPlaylistRepository
{
  inputMock = {} as FindFileInFileToPlaylistDto;
  async find(input: FindFileInFileToPlaylistDto): Promise<string> {
    this.inputMock = input;
    return '';
  }
}
