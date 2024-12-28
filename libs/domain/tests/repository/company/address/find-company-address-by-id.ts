import {
  CompanyAddressResponseDto,
  FindCompanyAddressByIdRepository,
} from '../../../../src';
import { CompanyAddressMock } from '../../../entity';

export class FindCompanyAddressByIdRepositoryMock
  implements FindCompanyAddressByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<CompanyAddressResponseDto> {
    this.inputMock = id;
    return CompanyAddressMock;
  }
}
