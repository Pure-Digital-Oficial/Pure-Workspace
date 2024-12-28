import {
  DeleteSchedulingToDeviceDto,
  DeleteSchedulingToDeviceRepository,
} from '../../../src';
import { SchedulesToDeviceMock } from '../../entity/schedules-to-device/schedules-to-device.mock';

export class DeleteSchedulingToDeviceRepositoryMock
  implements DeleteSchedulingToDeviceRepository
{
  inputMock = {} as DeleteSchedulingToDeviceDto;
  async delete(input: DeleteSchedulingToDeviceDto): Promise<string> {
    this.inputMock = input;
    return SchedulesToDeviceMock.id;
  }
}
