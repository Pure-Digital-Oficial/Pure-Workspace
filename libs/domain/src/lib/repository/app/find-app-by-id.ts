import { App } from '../../entity';

export interface FindAppByIdRepository {
  find(input: string): Promise<App>;
}
