import { StateResponseDto } from '../state';

export interface CountryResponseDto {
  id: string;
  name: string;
  uf: string;
  states: StateResponseDto[];
}
