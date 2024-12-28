import {
  ListSimpleCountryDto,
  ListSimpleCountryResponseDto,
} from '../../../dto';

export interface ListSimpleCountryRepository {
  list(): Promise<ListSimpleCountryResponseDto[]>;
}
