import { SelectCompanyDto } from '../../../dto';

export interface SelectCompanyRepository {
  select(input: SelectCompanyDto): Promise<string>;
}
