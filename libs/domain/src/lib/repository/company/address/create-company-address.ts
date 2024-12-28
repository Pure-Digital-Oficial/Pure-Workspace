import { CreateCompanyAddressDto } from '../../../dto';

export interface CreateCompanyAddressRepository {
  create(input: CreateCompanyAddressDto): Promise<string>;
}
