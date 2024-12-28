import { FindPlaylistByIdRepository, PlaylistResponseDto } from '../../../src';
import { PlaylistResponseMock } from '../../entity';
export class FindPlaylistByIdRepositoryMock
  implements FindPlaylistByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<PlaylistResponseDto> {
    this.inputMock = id;
    return PlaylistResponseMock;
  }
}
