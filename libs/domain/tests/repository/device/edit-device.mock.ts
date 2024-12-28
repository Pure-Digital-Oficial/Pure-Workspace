import { EditDeviceDto, EditDeviceRepository } from '../../../src';
import { DeviceMock } from '../../entity';

export class EditDeviceRepositoryMock implements EditDeviceRepository {
  inputMock = {} as EditDeviceDto;
  async edit(input: EditDeviceDto): Promise<string> {
    this.inputMock = input;
    return DeviceMock.id;
  }
}
