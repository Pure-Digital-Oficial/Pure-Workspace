import { FindUrlFileDto } from '../../dto';

export interface FindUrlFileRepository {
  find(input: FindUrlFileDto): Promise<string>;
}
