import { CreateDeviceDto, CreateDeviceRepository } from '../../../src';
import { DeviceMock } from '../../entity';

export class CreateDeviceRepositoryMock implements CreateDeviceRepository {
  inputMock = {} as CreateDeviceDto;
  async create(input: CreateDeviceDto): Promise<string> {
    this.inputMock = input;
    return DeviceMock.id;
  }
}
