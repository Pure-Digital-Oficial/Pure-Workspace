import { CompanyResponsibleResponseDto } from '../../../dto';

export interface FindCompanyResponsibleByIdRepository {
  find(id: string): Promise<CompanyResponsibleResponseDto>;
}
