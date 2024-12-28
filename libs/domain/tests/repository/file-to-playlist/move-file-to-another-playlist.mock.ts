import {
  MoveFileToAnotherPlaylistDto,
  MoveFileToAnotherPlaylistRepository,
} from '../../../src';

export class MoveFileToAnotherPlaylistRepositoryMock
  implements MoveFileToAnotherPlaylistRepository
{
  inputMock = {} as MoveFileToAnotherPlaylistDto;
  async move(input: MoveFileToAnotherPlaylistDto): Promise<void> {
    this.inputMock = input;
  }
}
