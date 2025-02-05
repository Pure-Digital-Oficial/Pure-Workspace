import { CreateContactUsDto } from '../../../dto';

export interface CreateContactUsRepository {
  create(input: CreateContactUsDto): Promise<string>;
}
