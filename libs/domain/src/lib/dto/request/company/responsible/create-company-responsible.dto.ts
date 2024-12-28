import { CompanyBodyResponsibleDto } from './company-body-responsible.dto';

export interface CreateCompanyResponsibleDto {
  loggedUserId: string;
  companyId: string;
  body: CompanyBodyResponsibleDto;
}
