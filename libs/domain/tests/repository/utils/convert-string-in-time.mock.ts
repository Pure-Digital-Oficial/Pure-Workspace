import { ConvertStringInTimeRepository } from '../../../src';

export class ConvertStringInTimeRepositoryMock
  implements ConvertStringInTimeRepository
{
  inputMock = '';
  async convert(input: string): Promise<Date> {
    this.inputMock = input;
    return new Date();
  }
}
