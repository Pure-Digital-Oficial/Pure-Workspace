import {
  FindPlaylistByNameDto,
  FindPlaylistByNameRepository,
  Playlist,
} from '../../../src';
export class FindPlaylistByNameRepositoryMock
  implements FindPlaylistByNameRepository
{
  inputMock = {} as FindPlaylistByNameDto;
  returnMock = {} as Playlist;
  async find(input: FindPlaylistByNameDto): Promise<Playlist> {
    this.inputMock = input;
    return this.returnMock;
  }
}
