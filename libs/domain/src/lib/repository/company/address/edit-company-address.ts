import { EditCompanyAddressDto } from '../../../dto';

export interface EditCompanyAddressRepository {
  edit(input: EditCompanyAddressDto): Promise<string>;
}
