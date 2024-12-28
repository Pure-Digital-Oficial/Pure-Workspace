import { CountryResponseDto } from '../../../dto';

export interface FindCountryByIdRepository {
  find(id: string): Promise<CountryResponseDto>;
}
