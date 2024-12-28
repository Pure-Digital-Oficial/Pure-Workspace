import { CompanyBodyAddressDto } from './company-body-address.dto';

export interface EditCompanyAddressDto {
  loggedUserId: string;
  companyAddressId: string;
  body: CompanyBodyAddressDto;
}
