import { CityResponseDto } from '../../../../src';
import { FindCityByIdRepository } from '../../../../src/lib/repository/address';
import { CityMock } from '../../../entity/address/city.mock';

export class FindCityByIdRepositoryMock implements FindCityByIdRepository {
  inputMock = '';
  async find(id: string): Promise<CityResponseDto> {
    this.inputMock = id;
    return CityMock;
  }
}
