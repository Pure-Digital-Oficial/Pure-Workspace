import { FindSchedulesByDeviceIdDto } from '../../dto';
import { Scheduling } from '../../entity';

export interface FindSchedulesByDeviceIdRepository {
  find(input: FindSchedulesByDeviceIdDto): Promise<Scheduling[]>;
}
