import { ChangeUserTypeDto, ChangeUserTypeRepository } from '../../../src';
import { userMock } from '../../entity';

export class ChangeUserTypeRepositoryMock implements ChangeUserTypeRepository {
  inputMock = {} as ChangeUserTypeDto;
  async change(input: ChangeUserTypeDto): Promise<string> {
    this.inputMock = input;
    return userMock.userId;
  }
}
