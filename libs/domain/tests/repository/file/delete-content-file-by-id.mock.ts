import {
  DeleteContentFileByIdDto,
  DeleteContentFileByIdRepository,
} from '../../../src';

export class DeleteContentFileByIdRepositoryMock
  implements DeleteContentFileByIdRepository
{
  inputMock: DeleteContentFileByIdDto = {} as DeleteContentFileByIdDto;
  async delete(input: DeleteContentFileByIdDto): Promise<void> {
    this.inputMock = input;
  }
}
