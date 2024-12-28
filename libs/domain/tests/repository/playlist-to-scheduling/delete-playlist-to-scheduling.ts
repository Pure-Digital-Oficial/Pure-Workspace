import {
  DeletePlaylistToSchedulingDto,
  DeletePlaylistToSchedulingRepository,
} from '../../../src';

export class DeletePlaylistToSchedulingRepositoryMock
  implements DeletePlaylistToSchedulingRepository
{
  inputMock = {} as DeletePlaylistToSchedulingDto;
  async delete(input: DeletePlaylistToSchedulingDto): Promise<void> {
    this.inputMock = input;
  }
}
