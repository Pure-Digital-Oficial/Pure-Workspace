import {
  Device,
  FindDeviceByNameDto,
  FindDeviceByNameRepository,
} from '../../../src';

export class FindDeviceByNameRepositoryMock
  implements FindDeviceByNameRepository
{
  returnMock = {} as Device;
  inputMock = {} as FindDeviceByNameDto;
  async find(input: FindDeviceByNameDto): Promise<Device> {
    this.inputMock = input;
    return this.returnMock;
  }
}
