import { DeleteSchedulingToDeviceDto } from '../../dto';

export interface DeleteSchedulingToDeviceRepository {
  delete(input: DeleteSchedulingToDeviceDto): Promise<string>;
}
