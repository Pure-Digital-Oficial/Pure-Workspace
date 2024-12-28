import { ListDeviceDto, ListDeviceResponseDto } from '../../dto';

export interface ListDeviceRepository {
  list(input: ListDeviceDto): Promise<ListDeviceResponseDto>;
}
