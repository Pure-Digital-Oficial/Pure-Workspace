import {
  FindFilesByPlaylistDto,
  FindFilesByPlaylistRepository,
  FindFilesByPlaylistResponseDto,
} from '../../../src';
import { ContentFileMock } from '../../entity';

export class FindFilesByPlaylistRepositoryMock
  implements FindFilesByPlaylistRepository
{
  inputMock = {} as FindFilesByPlaylistDto;
  async find(
    input: FindFilesByPlaylistDto
  ): Promise<FindFilesByPlaylistResponseDto> {
    this.inputMock = input;
    return {
      total: 1,
      totalPages: 1,
      files: [ContentFileMock],
    };
  }
}
