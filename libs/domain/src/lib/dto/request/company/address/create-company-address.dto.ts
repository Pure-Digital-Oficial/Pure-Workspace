import { CompanyBodyAddressDto } from './company-body-address.dto';

export interface CreateCompanyAddressDto {
  body: CompanyBodyAddressDto;
  companyId: string;
  loggedUserId: string;
}
