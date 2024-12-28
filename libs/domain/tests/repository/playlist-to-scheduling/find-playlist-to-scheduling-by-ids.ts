import {
  FindPlaylistToSchedulingByIdsRepository,
  PlaylistToSchedulingDto,
} from '../../../src';

export class FindPlaylistToSchedulingByIdsRepositoryMock
  implements FindPlaylistToSchedulingByIdsRepository
{
  inputMock = {} as PlaylistToSchedulingDto;
  async find(input: PlaylistToSchedulingDto): Promise<string> {
    this.inputMock = input;
    return '';
  }
}
