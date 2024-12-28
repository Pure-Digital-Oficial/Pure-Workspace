import { FindUserByIdRepository, UserList } from '../../../src';
import { listUserMock } from '../../entity';

export class FindUserByIdRepositoryMock implements FindUserByIdRepository {
  id = '';

  async find(id: string): Promise<UserList> {
    this.id = id;
    return listUserMock[0];
  }
}
