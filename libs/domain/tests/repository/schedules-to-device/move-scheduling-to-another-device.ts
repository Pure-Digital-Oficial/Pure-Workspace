import {
  MoveSchedulingToAnotherDeviceDto,
  MoveSchedulingToAnotherDeviceRepository,
} from '../../../src';
import { SchedulesToDeviceMock } from '../../entity/schedules-to-device/schedules-to-device.mock';

export class MoveSchedulingToAnotherDeviceRepositoryMock
  implements MoveSchedulingToAnotherDeviceRepository
{
  inputMock = {} as MoveSchedulingToAnotherDeviceDto;
  async move(input: MoveSchedulingToAnotherDeviceDto): Promise<string> {
    this.inputMock = input;
    return SchedulesToDeviceMock.id;
  }
}
