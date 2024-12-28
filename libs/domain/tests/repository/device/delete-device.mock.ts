import { DeleteDeviceDto, DeleteDeviceRepository } from '../../../src';

export class DeleteDeviceRepositoryMock implements DeleteDeviceRepository {
  inputMock = {} as DeleteDeviceDto;
  async delete(input: DeleteDeviceDto): Promise<void> {
    this.inputMock = input;
  }
}
