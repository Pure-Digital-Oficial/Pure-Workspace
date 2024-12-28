import { EditCompanyDto, EditCompanyRepository } from '../../../../src';
import { CompanySimpleMock } from '../../../entity';

export class EditCompanyRepositoryMock implements EditCompanyRepository {
  inputMock = {} as EditCompanyDto;
  async edit(input: EditCompanyDto): Promise<string> {
    this.inputMock = input;
    return CompanySimpleMock.id;
  }
}
