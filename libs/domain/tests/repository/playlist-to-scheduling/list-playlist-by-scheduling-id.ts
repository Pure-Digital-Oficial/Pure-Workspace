import {
  ListPlaylistBySchedulingIdDto,
  ListPlaylistBySchedulingIdRepository,
  ListPlaylistResponseDto,
} from '../../../src';
import { ListPlaylistResponseMock } from '../../entity';

export class ListPlaylistBySchedulingIdRepositoryMock
  implements ListPlaylistBySchedulingIdRepository
{
  inputMock = {} as ListPlaylistBySchedulingIdDto;
  async list(
    input: ListPlaylistBySchedulingIdDto
  ): Promise<ListPlaylistResponseDto> {
    this.inputMock = input;
    return ListPlaylistResponseMock;
  }
}
