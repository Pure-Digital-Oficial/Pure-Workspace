import { FilterByEmailOrNicknameRepository, User } from '../../../src';
import { userMock } from '../../entity';

export class FilterByEmailOrNicknameRepositoryMock
  implements FilterByEmailOrNicknameRepository
{
  inputMock = '';
  async filter(input: string): Promise<User> {
    this.inputMock = input;
    return userMock;
  }
}
