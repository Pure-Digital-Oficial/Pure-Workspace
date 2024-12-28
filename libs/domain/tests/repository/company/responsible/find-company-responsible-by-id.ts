import {
  CompanyResponsibleResponseDto,
  FindCompanyResponsibleByIdRepository,
} from '../../../../src';
import { CompanyResponsibleMock } from '../../../entity';

export class FindCompanyResponsibleByIdRepositoryMock
  implements FindCompanyResponsibleByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<CompanyResponsibleResponseDto> {
    this.inputMock = id;
    return CompanyResponsibleMock;
  }
}
