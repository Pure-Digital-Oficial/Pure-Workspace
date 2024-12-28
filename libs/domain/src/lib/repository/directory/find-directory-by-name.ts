import { FindDirectoryByNameDto } from '../../dto';
import { Directory } from '../../entity';

export interface FindDirectoryByNameRepository {
  find(input: FindDirectoryByNameDto): Promise<Directory>;
}
