import {
  CreateCompanyAddressDto,
  CreateCompanyAddressRepository,
} from '../../../../src';
import { CompanyAddressMock } from '../../../entity';

export class CreateCompanyAddressRepositoryMock
  implements CreateCompanyAddressRepository
{
  inputmock = {} as CreateCompanyAddressDto;
  async create(input: CreateCompanyAddressDto): Promise<string> {
    this.inputmock = input;
    return CompanyAddressMock.id;
  }
}
