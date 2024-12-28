import { EditUserDto, EditUserRepository } from '../../../src';
import { userMock } from '../../entity';

export class EditUserRepositoryMock implements EditUserRepository {
  inputMock = {} as EditUserDto;
  async edit(input: EditUserDto): Promise<string> {
    this.inputMock = input;
    return userMock.userId;
  }
}
