import { CreateCompanyDto, CreateCompanyRepository } from '../../../../src';
import { CompanySimpleMock } from '../../../entity';

export class CreateCompanyRepositoryMock implements CreateCompanyRepository {
  inputMock = {} as CreateCompanyDto;
  async create(input: CreateCompanyDto): Promise<string> {
    this.inputMock = input;
    return CompanySimpleMock.id;
  }
}
