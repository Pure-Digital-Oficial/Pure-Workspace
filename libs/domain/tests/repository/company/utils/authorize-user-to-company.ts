import {
  AuthorizeUserToCompanyDto,
  AuthorizeUserToCompanyRepository,
} from '../../../../src';
import { userMock } from '../../../entity';

export class AuthorizeUserToCompanyRepositoryMock
  implements AuthorizeUserToCompanyRepository
{
  inputMock = {} as AuthorizeUserToCompanyDto;
  async auth(input: AuthorizeUserToCompanyDto): Promise<string> {
    this.inputMock = input;
    return userMock.userId;
  }
}
