import { CreateCompanyResponsibleDto } from '../../../dto';

export interface CreateCompanyResponsibleRespository {
  create(input: CreateCompanyResponsibleDto): Promise<string>;
}
