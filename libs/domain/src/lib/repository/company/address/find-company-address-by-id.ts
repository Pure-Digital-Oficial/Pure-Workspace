import { CompanyAddressResponseDto } from '../../../dto';

export interface FindCompanyAddressByIdRepository {
  find(id: string): Promise<CompanyAddressResponseDto>;
}
