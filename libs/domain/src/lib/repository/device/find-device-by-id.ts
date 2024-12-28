import { Device } from '../../entity';

export interface FindDeviceByIdRepository {
  find(id: string): Promise<Device>;
}
