import {
  PlaylistToSchedulingDto,
  AddPlaylistToSchedulingRepository,
} from '../../../src';
import {
  PlaylistMock,
  PlaylistToSchedulingMock,
  SchedulingMock,
} from '../../entity';

export class AddPlaylistsToSchedulingRepositoryMock
  implements AddPlaylistToSchedulingRepository
{
  inputMock = {} as PlaylistToSchedulingDto;
  async add(input: PlaylistToSchedulingDto): Promise<string> {
    this.inputMock = input;
    return PlaylistToSchedulingMock.id;
  }
}
