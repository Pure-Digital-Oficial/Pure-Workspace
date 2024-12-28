import { CompanyResponseDto } from '../../../dto';

export interface ConsultCompanyByCnpjRepository {
  consult(cnpj: string): Promise<CompanyResponseDto>;
}
