import {
  AddSchedulingToDeviceDto,
  AddSchedulingToDeviceRepository,
} from '../../../src';
import { PlaylistToSchedulingMock, SchedulesToDeviceMock } from '../../entity';

export class AddSchedulingToDeviceRepositoryMock
  implements AddSchedulingToDeviceRepository
{
  inputMock = {} as AddSchedulingToDeviceDto;
  async add(input: AddSchedulingToDeviceDto): Promise<string> {
    this.inputMock = input;
    return SchedulesToDeviceMock.id;
  }
}
