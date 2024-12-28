import { EditCompanyResponsibleDto } from '../../../dto';

export interface EditCompanyResponsibleRepository {
  edit(input: EditCompanyResponsibleDto): Promise<string>;
}
