import { DeviceBodyDto } from './device-body.dto';

export interface CreateDeviceDto {
  body: DeviceBodyDto;
  loggedUserId: string;
  companyId: string;
}
