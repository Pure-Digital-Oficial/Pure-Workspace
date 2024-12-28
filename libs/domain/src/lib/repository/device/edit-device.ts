import { EditDeviceDto } from '../../dto';

export interface EditDeviceRepository {
  edit(input: EditDeviceDto): Promise<string>;
}
