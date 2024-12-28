import { CompanyBodyDto } from './company-body.dto';

export interface EditCompanyDto {
  loggedUserId: string;
  companyId: string;
  body: CompanyBodyDto;
}
