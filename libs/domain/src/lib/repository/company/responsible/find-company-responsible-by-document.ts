import { CompanyResponsibleResponseDto } from '../../../dto';

export interface FindCompanyResponsibleByDocumentRepository {
  find(document: string): Promise<CompanyResponsibleResponseDto>;
}
