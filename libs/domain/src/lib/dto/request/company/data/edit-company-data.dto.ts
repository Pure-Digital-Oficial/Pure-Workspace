import { CompanyDataBodyDto } from './company-body-data.dto';

export interface EditCompanyDataDto {
  loggedUserId: string;
  companyDataId: string;
  body: CompanyDataBodyDto;
}
