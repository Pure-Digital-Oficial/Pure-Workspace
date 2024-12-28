import {
  FindSchedulesByDeviceIdDto,
  FindSchedulesByDeviceIdRepository,
  Scheduling,
} from '../../../src';
import { SchedulingMock } from '../../entity';

export class FindSchedulesByDeviceIdRepositoryMock
  implements FindSchedulesByDeviceIdRepository
{
  inputMock = {} as FindSchedulesByDeviceIdDto;
  async find(input: FindSchedulesByDeviceIdDto): Promise<Scheduling[]> {
    this.inputMock = input;
    return [SchedulingMock];
  }
}
