import { AddUserToAnotherCompanyDto } from '../../dto';

export interface AddUserToAnotherCompanyRepository {
  add(input: AddUserToAnotherCompanyDto): Promise<string>;
}
