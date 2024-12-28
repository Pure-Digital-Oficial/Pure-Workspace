import { ContentFile } from '../../entity';

export interface FindContentFileByIdRepository {
  find(id: string): Promise<ContentFile>;
}
