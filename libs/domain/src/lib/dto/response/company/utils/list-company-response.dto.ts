import { ListSimpleCompanyResponseDto } from '../simple';

export interface ListCompanyResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  companies: ListSimpleCompanyResponseDto[];
}
