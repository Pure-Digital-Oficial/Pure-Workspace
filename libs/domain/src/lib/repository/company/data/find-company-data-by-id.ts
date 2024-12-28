import { CompanyDataResponseDto } from '../../../dto';

export interface FindCompanyDataByIdRepository {
  find(id: string): Promise<CompanyDataResponseDto>;
}
