import { CityPrismaDto } from '../city';

export interface StatePrismaDto {
  state_id: string;
  name: string;
  uf: string;
  city: CityPrismaDto[];
}
