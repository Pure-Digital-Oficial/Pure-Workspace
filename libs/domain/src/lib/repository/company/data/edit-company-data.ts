import { EditCompanyDataDto } from '../../../dto';

export interface EditCompanyDataRepository {
  edit(input: EditCompanyDataDto): Promise<string>;
}
