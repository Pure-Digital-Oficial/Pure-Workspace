import { FindSchedulingByIdRepository, Scheduling } from '../../../src';
import { SchedulingMock } from '../../entity/scheduling/scheduling.mock';

export class FindSchedulingByIdRepositoryMock
  implements FindSchedulingByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<Scheduling> {
    this.inputMock = id;
    return SchedulingMock;
  }
}
