import { DeleteSchedulingDto, DeleteSchedulingRepository } from '../../../src';

export class DeleteSchedulingRepositoryMock
  implements DeleteSchedulingRepository
{
  inputMock = {} as DeleteSchedulingDto;
  async delete(input: DeleteSchedulingDto): Promise<void> {
    this.inputMock = input;
  }
}
