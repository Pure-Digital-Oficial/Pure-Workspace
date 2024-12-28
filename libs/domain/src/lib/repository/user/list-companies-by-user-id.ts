import { ListCompaniesByUserIdDto, ListCompanyResponseDto } from '../../dto';

export interface ListCompaniesByUserIdRepository {
  list(input: ListCompaniesByUserIdDto): Promise<ListCompanyResponseDto>;
}
