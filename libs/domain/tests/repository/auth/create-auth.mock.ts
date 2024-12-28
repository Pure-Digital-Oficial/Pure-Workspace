import { CreateAuthDto, CreateAuthRepository } from '../../../src';

export class CreateAuthRepositoryMock implements CreateAuthRepository {
  createAuth: CreateAuthDto = {
    email: '',
    password: '',
    userId: '',
  };
  async create(input: CreateAuthDto): Promise<void> {
    this.createAuth = input;
  }
}
