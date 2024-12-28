import { Directory } from '../../entity';

export interface FindDirectoryByIdRepository {
  find(id: string): Promise<Directory>;
}
