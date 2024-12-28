import { FilterByEmailOrNicknameRepository, User } from '../../../src';

export class FilterByEmailOrNicknameEmptyRepositoryMock
  implements FilterByEmailOrNicknameRepository
{
  returnMock = {} as User;
  inputMock = '';
  async filter(input: string): Promise<User> {
    this.inputMock = input;
    return this.returnMock;
  }
}
