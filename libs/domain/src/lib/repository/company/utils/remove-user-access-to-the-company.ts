import { RemoveUserAccessToTheCompanyDto } from '../../../dto';

export interface RemoveUserAccessToTheCompanyRepository {
  remove(input: RemoveUserAccessToTheCompanyDto): Promise<string>;
}
