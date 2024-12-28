import { UnauthorizeUserToCompanyDto } from '../../../dto';

export interface UnauthorizeUserToCompanyRepository {
  auth(input: UnauthorizeUserToCompanyDto): Promise<string>;
}
