import { RegisterContentFileDto } from '../../dto';

export interface CreateContentFileRepository {
  create(input: RegisterContentFileDto): Promise<string>;
}
