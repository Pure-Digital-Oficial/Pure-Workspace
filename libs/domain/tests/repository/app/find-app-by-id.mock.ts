import { App, FindAppByIdRepository } from '../../../src';
import { appMock } from '../../entity/app/app.mock';

export class FindAppByIdRepositoryMock implements FindAppByIdRepository {
  async find(input: string): Promise<App> {
    return appMock;
  }
}
