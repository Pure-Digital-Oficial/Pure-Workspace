import { CompanyResponseDto, FindCompanyByIdRepository } from '../../../../src';
import { CompanyMock } from '../../../entity';

export class FindCompanyByIdRepositoryMock
  implements FindCompanyByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<CompanyResponseDto> {
    this.inputMock = id;
    return CompanyMock;
  }
}
