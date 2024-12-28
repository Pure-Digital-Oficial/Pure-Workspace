import { EditCompanyDto } from '../../../dto';

export interface EditCompanyRepository {
  edit(input: EditCompanyDto): Promise<string>;
}
