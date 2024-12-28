import { CreateCompanyDataDto } from '../../../dto';

export interface CreateCompanyDataRepository {
  create(input: CreateCompanyDataDto): Promise<string>;
}
