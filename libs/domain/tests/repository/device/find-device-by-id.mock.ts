import { Device, FindDeviceByIdRepository } from '../../../src';
import { DeviceMock } from '../../entity';

export class FindDeviceByIdRepositoryMock implements FindDeviceByIdRepository {
  inputMock = '';
  async find(id: string): Promise<Device> {
    this.inputMock = id;
    return DeviceMock;
  }
}
