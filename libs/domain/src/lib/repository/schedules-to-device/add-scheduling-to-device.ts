import { AddSchedulingToDeviceDto } from '../../dto';

export interface AddSchedulingToDeviceRepository {
  add(input: AddSchedulingToDeviceDto): Promise<string>;
}
