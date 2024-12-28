import {
  ListDeviceDto,
  ListDeviceRepository,
  ListDeviceResponseDto,
} from '../../../src';
import { ListDeviceResponseMock } from '../../entity/device/list-device.mock';

export class ListDeviceRepositoryMock implements ListDeviceRepository {
  input = {} as ListDeviceDto;
  async list(input: ListDeviceDto): Promise<ListDeviceResponseDto> {
    this.input = input;
    return ListDeviceResponseMock;
  }
}
