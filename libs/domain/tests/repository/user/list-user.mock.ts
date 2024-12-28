import {
  ListUserDto,
  ListUserRepository,
  ListUserResponseDto,
} from '../../../src';
import { listUserMock } from '../../entity';

export class ListUserRepositoryMock implements ListUserRepository {
  listUser = {} as ListUserDto;

  async list(input: ListUserDto): Promise<ListUserResponseDto> {
    this.listUser = input;
    return {
      total: 1,
      totalPages: 1,
      users: listUserMock,
    };
  }
}
