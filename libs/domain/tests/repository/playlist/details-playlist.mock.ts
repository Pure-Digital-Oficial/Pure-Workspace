import {
  DetailsPlaylistDto,
  DetailsPlaylistRepository,
  PlaylistResponseDto,
} from '../../../src';
import { PlaylistResponseMock } from '../../entity';

export class DetailsPlaylistRepositoryMock
  implements DetailsPlaylistRepository
{
  inputMock = {} as DetailsPlaylistDto;
  async details(input: DetailsPlaylistDto): Promise<PlaylistResponseDto> {
    this.inputMock = input;
    return PlaylistResponseMock;
  }
}
