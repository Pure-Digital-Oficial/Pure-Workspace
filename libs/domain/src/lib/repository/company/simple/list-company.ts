import { ListCompanyDto, ListCompanyResponseDto } from '../../../dto';

export interface ListCompanyRepository {
  list(input: ListCompanyDto): Promise<ListCompanyResponseDto>;
}
