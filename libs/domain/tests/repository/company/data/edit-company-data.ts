import { EditCompanyDataDto, EditCompanyDataRepository } from '../../../../src';
import { CompanyDataMock } from '../../../entity';

export class EditCompanyDataRepositoryMock
  implements EditCompanyDataRepository
{
  inputMock = {} as EditCompanyDataDto;
  async edit(input: EditCompanyDataDto): Promise<string> {
    this.inputMock = input;
    return CompanyDataMock.id;
  }
}
