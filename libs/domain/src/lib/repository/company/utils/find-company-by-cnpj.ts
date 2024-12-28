import { Company } from '../../../entity';

export interface FindCompanyByCnpjRepository {
  find(cnpj: string): Promise<Company>;
}
