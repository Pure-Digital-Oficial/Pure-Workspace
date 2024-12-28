import { UserList } from '../../entity';

export interface FindUserByIdRepository {
  find(id: string): Promise<UserList>;
}
