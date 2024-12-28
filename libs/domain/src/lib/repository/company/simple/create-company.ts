import { CreateCompanyDto } from '../../../dto';

export interface CreateCompanyRepository {
  create(input: CreateCompanyDto): Promise<string>;
}
