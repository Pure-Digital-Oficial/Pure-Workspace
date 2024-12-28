import {
  CreateCompanyAddressDto,
  EditCompanyAddressDto,
  EditCompanyAddressRepository,
} from '../../../../src';
import { CompanyAddressMock } from '../../../entity';

export class EditCompanyAddressRepositoryMock
  implements EditCompanyAddressRepository
{
  inputmock = {} as EditCompanyAddressDto;
  async edit(input: EditCompanyAddressDto): Promise<string> {
    this.inputmock = input;
    return CompanyAddressMock.id;
  }
}
