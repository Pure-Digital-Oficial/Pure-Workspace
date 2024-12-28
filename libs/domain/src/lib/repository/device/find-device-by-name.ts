import { FindDeviceByNameDto } from '../../dto';
import { Device } from '../../entity';

export interface FindDeviceByNameRepository {
  find(input: FindDeviceByNameDto): Promise<Device>;
}
