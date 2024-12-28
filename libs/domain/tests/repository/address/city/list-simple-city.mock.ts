import {
  CityResponseDto,
  ListSimpleCityDto,
  ListSimpleCityRepository,
} from '../../../../src';
import { CityMock } from '../../../entity';

export class ListSimpleCityRepositoryMock implements ListSimpleCityRepository {
  inputMock = {} as ListSimpleCityDto;
  async list(input: ListSimpleCityDto): Promise<CityResponseDto[]> {
    this.inputMock = input;
    return [CityMock];
  }
}
