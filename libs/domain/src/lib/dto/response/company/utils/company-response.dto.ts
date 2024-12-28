import { CompanyAddressResponseDto } from '../address';
import { CompanyDataResponseDto } from '../data';
import { CompanySimpleResponseDto } from '../simple';

export interface CompanyResponseDto {
  data: CompanyDataResponseDto;
  simple: CompanySimpleResponseDto;
  address: CompanyAddressResponseDto;
}
