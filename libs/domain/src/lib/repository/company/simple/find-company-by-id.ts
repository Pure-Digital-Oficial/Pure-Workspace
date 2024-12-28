import { CompanyResponseDto } from '../../../dto';

export interface FindCompanyByIdRepository {
  find(id: string): Promise<CompanyResponseDto>;
}
