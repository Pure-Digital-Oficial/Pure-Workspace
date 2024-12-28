import {
  CreateCompanyDataDto,
  CreateCompanyDataRepository,
} from '../../../../src';
import { CompanyDataMock } from '../../../entity';

export class CreateCompanyDataRepositoryMock
  implements CreateCompanyDataRepository
{
  inputMock = {} as CreateCompanyDataDto;
  async create(input: CreateCompanyDataDto): Promise<string> {
    this.inputMock = input;
    return CompanyDataMock.id;
  }
}
