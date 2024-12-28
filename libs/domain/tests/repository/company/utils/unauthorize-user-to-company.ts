import {
  UnauthorizeUserToCompanyDto,
  UnauthorizeUserToCompanyRepository,
} from '../../../../src';
import { CompanyMock } from '../../../entity';

export class UnauthorizeUserToCompanyRepositoryMock
  implements UnauthorizeUserToCompanyRepository
{
  inputMock = {} as UnauthorizeUserToCompanyDto;
  async auth(input: UnauthorizeUserToCompanyDto): Promise<string> {
    this.inputMock = input;
    return CompanyMock.simple.id;
  }
}
