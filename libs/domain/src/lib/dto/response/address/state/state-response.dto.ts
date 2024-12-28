import { CityResponseDto } from '../city';

export interface StateResponseDto {
  id: string;
  name: string;
  uf: string;
  cities: CityResponseDto[];
}
