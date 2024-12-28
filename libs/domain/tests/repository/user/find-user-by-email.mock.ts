import {
  FindUserByEmailDto,
  FindUserByEmailRepository,
  LoggedUser,
} from '../../../src';
import { LoggedUserMock } from '../../entity/user/logged-user.mock';

export class FindUserByEmailRepositoryMock
  implements FindUserByEmailRepository
{
  inputMock = {} as FindUserByEmailDto;
  async find(input: FindUserByEmailDto): Promise<LoggedUser> {
    this.inputMock = input;
    return LoggedUserMock;
  }
}
