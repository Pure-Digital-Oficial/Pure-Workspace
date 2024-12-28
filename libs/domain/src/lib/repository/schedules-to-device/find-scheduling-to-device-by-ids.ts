import { FindSchedulingToDeviceByIdsDto } from '../../dto';

export interface FindSchedulingToDeviceByIdsRepository {
  find(input: FindSchedulingToDeviceByIdsDto): Promise<string>;
}
