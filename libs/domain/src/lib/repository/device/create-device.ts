import { CreateDeviceDto } from '../../dto';

export interface CreateDeviceRepository {
  create(input: CreateDeviceDto): Promise<string>;
}
