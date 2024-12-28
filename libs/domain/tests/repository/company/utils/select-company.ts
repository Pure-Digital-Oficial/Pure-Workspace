import { SelectCompanyDto, SelectCompanyRepository } from '../../../../src';
import { CompanyMock } from '../../../entity';

export class SelectCompanyRepositoryMock implements SelectCompanyRepository {
  inputMock = {} as SelectCompanyDto;
  async select(input: SelectCompanyDto): Promise<string> {
    this.inputMock = input;
    return CompanyMock.simple.id;
  }
}
