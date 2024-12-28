import { CompanyBodyDto } from './company-body.dto';

export interface CreateCompanyDto {
  body: CompanyBodyDto;
  loggedUserId: string;
}
