import {
  FindSchedulingToDeviceByIdsDto,
  FindSchedulingToDeviceByIdsRepository,
} from '../../../src';

export class FindSchedulingToDeviceByIdsRepositoryMock
  implements FindSchedulingToDeviceByIdsRepository
{
  inputMock = {} as FindSchedulingToDeviceByIdsDto;
  outPutMock = '';
  async find(input: FindSchedulingToDeviceByIdsDto): Promise<string> {
    this.inputMock = input;
    return this.outPutMock;
  }
}
