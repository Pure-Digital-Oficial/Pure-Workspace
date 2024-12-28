import { EditPlaylistDto, EditPlaylistRepository } from '../../../src';

export class EditPlaylistRepositoryMock implements EditPlaylistRepository {
  inputMock = {} as EditPlaylistDto;
  async edit(input: EditPlaylistDto): Promise<void> {
    this.inputMock = input;
    return undefined;
  }
}
