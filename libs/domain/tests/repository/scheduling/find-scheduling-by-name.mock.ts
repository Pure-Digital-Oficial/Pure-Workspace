import {
  FindSchedulingByNameDto,
  FindSchedulingByNameRepository,
  Scheduling,
} from '../../../src';

export class FindSchedulingByNameRepositoryMock
  implements FindSchedulingByNameRepository
{
  returnMock = {} as Scheduling;
  inputMock = {} as FindSchedulingByNameDto;
  async find(input: FindSchedulingByNameDto): Promise<Scheduling> {
    this.inputMock = input;
    return this.returnMock;
  }
}
