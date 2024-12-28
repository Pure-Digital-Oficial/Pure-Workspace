import { CreatePlaylistDto, CreatePlaylistRepository } from '../../../src';
import { PlaylistMock } from '../../entity/playlist/playlist.mock';

export class CreatePlaylistRepositoryMock implements CreatePlaylistRepository {
  inputMock = {} as CreatePlaylistDto;
  async create(input: CreatePlaylistDto): Promise<string> {
    this.inputMock = input;
    return PlaylistMock.id;
  }
}
