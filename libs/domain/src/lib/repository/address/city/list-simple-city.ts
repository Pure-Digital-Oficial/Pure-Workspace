import { CityResponseDto, ListSimpleCityDto } from '../../../dto';

export interface ListSimpleCityRepository {
  list(input: ListSimpleCityDto): Promise<CityResponseDto[]>;
}
