import { MoveSchedulingToAnotherDeviceDto } from '../../dto';

export interface MoveSchedulingToAnotherDeviceRepository {
  move(input: MoveSchedulingToAnotherDeviceDto): Promise<string>;
}
