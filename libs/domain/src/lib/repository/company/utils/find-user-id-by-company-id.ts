import { FindUserAndCompanyIdDto } from '../../../dto';

export interface FindUserIdByCompanyIdRepository {
  find(input: FindUserAndCompanyIdDto): Promise<string>;
}
