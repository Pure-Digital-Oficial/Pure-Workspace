import { ValidateHashDto, ValidateHashRepository } from '../../../src';

export class ValidateHashRepositoryMock implements ValidateHashRepository {
  inputMock = {} as ValidateHashDto;
  async validate(input: ValidateHashDto): Promise<boolean> {
    this.inputMock = input;
    return true;
  }
}
