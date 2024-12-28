import { ListDeviceResponseDto } from '../../../src';
import { DeviceMock } from '../../entity/device/device.mock';

export const ListDeviceResponseMock: ListDeviceResponseDto = {
  total: 1,
  filteredTotal: 1,
  totalPages: 1,
  devices: [DeviceMock],
};
