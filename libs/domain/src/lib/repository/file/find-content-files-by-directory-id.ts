import { ContentFile } from '../../entity';

export interface FindContentFilesByDirectoryIdRepository {
  find(id: string): Promise<ContentFile[]>;
}
