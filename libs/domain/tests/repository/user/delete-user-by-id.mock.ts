import { DeleteUserByIdDto, DeleteUserByIdRepository } from '../../../src';
import { userMock } from '../../entity';

export class DeleteUserByIdRepositoryMock implements DeleteUserByIdRepository {
  deleteUserDto = {} as DeleteUserByIdDto;
  async delete(input: DeleteUserByIdDto): Promise<string> {
    this.deleteUserDto = input;

    return userMock.userId;
  }
}
