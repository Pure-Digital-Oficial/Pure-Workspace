import {
  AddFileToPlaylistDto,
  AddFileToPlaylistRepository,
} from '../../../src';
import { FileToPlaylistMock } from '../../entity';

export class AddFileToPlaylistRepositoryMock
  implements AddFileToPlaylistRepository
{
  inputMock = {} as AddFileToPlaylistDto;
  async add(input: AddFileToPlaylistDto): Promise<string[]> {
    this.inputMock = input;
    return [FileToPlaylistMock.id];
  }
}
