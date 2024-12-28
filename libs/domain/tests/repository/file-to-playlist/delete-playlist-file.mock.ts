import {
  DeletePlaylistFileDto,
  DeletePlaylistFileRepository,
} from '../../../src';

export class DeletePlaylistFileRepositoryMock
  implements DeletePlaylistFileRepository
{
  inputMock = {} as DeletePlaylistFileDto;
  async delete(input: DeletePlaylistFileDto): Promise<void> {
    this.inputMock = input;
    return;
  }
}
