import { DeleteCompanyByIdDto } from '../../../dto';

export interface DeleteCompanyByIdRepository {
  delete(input: DeleteCompanyByIdDto): Promise<string>;
}
