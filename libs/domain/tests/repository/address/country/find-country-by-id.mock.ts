import { CountryResponseDto } from '../../../../src';
import { FindCountryByIdRepository } from '../../../../src/lib/repository/address';
import { CountryMock } from '../../../entity';

export class FindCountryByIdRepositoryMock
  implements FindCountryByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<CountryResponseDto> {
    this.inputMock = id;
    return CountryMock;
  }
}
