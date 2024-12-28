import {
  CompanyResponseDto,
  ConsultCompanyByCnpjRepository,
} from '../../../../src';
import { CompanyMock } from '../../../entity';

export class ConsultCompanyByCnpjRepositoryMock
  implements ConsultCompanyByCnpjRepository
{
  inputMock = '';
  async consult(cnpj: string): Promise<CompanyResponseDto> {
    this.inputMock = cnpj;
    return CompanyMock;
  }
}
