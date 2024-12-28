import { CreateSchedulingDto, CreateSchedulingRepository } from '../../../src';
import { SchedulingMock } from '../../entity/scheduling/scheduling.mock';

export class CreateSchedulingRepositoryMock
  implements CreateSchedulingRepository
{
  inputMock = {} as CreateSchedulingDto;
  async create(input: CreateSchedulingDto): Promise<string> {
    this.inputMock = input;
    return SchedulingMock.id;
  }
}
