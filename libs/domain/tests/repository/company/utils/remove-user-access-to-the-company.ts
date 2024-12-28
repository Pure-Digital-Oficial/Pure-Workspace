import {
  RemoveUserAccessToTheCompanyDto,
  RemoveUserAccessToTheCompanyRepository,
} from '../../../../src';
import { CompanyMock } from '../../../entity';

export class RemoveUserAccessToTheCompanyRepositoryMock
  implements RemoveUserAccessToTheCompanyRepository
{
  inputMock = {} as RemoveUserAccessToTheCompanyDto;
  async remove(input: RemoveUserAccessToTheCompanyDto): Promise<string> {
    this.inputMock = input;
    return CompanyMock.simple.id;
  }
}
