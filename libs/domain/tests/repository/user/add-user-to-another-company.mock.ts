import {
  AddUserToAnotherCompanyDto,
  AddUserToAnotherCompanyRepository,
} from '../../../src';
import { CompanyMock, userMock } from '../../entity';

export class AddUserToAnotherCompanyRepositoryMock
  implements AddUserToAnotherCompanyRepository
{
  inputMock = {} as AddUserToAnotherCompanyDto;
  async add(input: AddUserToAnotherCompanyDto): Promise<string> {
    this.inputMock = input;
    return `${userMock.userId}- ${CompanyMock.simple.id}`;
  }
}
