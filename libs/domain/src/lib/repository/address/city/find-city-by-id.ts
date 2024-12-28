import { CityResponseDto } from '../../../dto';

export interface FindCityByIdRepository {
  find(id: string): Promise<CityResponseDto>;
}
