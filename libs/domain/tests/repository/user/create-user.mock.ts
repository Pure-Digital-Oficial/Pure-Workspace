import { CreateUserDto, CreateUserRepository } from '../../../src';
import { userMock } from '../../entity';

export class CreateUserRepositoryMock implements CreateUserRepository {
  createUser: CreateUserDto = {
    appId: '',
    name: '',
    nickname: '',
    birthDate: new Date(),
  };
  async create(input: CreateUserDto): Promise<string> {
    this.createUser = input;

    return userMock.userId;
  }
}
