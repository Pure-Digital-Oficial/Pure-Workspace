import { CompanyDataBodyDto } from './company-body-data.dto';

export interface CreateCompanyDataDto {
  loggedUserId: string;
  companyId: string;
  body: CompanyDataBodyDto;
}
