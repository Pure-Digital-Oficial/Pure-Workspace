import { AuthorizeUserToCompanyDto } from '../../../dto';

export interface AuthorizeUserToCompanyRepository {
  auth(input: AuthorizeUserToCompanyDto): Promise<string>;
}
