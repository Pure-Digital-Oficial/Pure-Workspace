import {
  CompanyAllIdsResponseDto,
  FindAllCompanyIdsDto,
  FindAllCompanyIdsRepository,
} from '../../../../src';
import { companyAllIdsMock } from '../../../entity';

export class FindAllCompanyIdsRepositoryMock
  implements FindAllCompanyIdsRepository
{
  inputMock = {} as FindAllCompanyIdsDto;
  async find(input: FindAllCompanyIdsDto): Promise<CompanyAllIdsResponseDto> {
    this.inputMock = input;
    return companyAllIdsMock;
  }
}
