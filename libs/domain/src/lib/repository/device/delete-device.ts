import { DeleteDeviceDto } from '../../dto';

export interface DeleteDeviceRepository {
  delete(input: DeleteDeviceDto): Promise<void>;
}
