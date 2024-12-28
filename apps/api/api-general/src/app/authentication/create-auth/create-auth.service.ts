import { Injectable } from '@nestjs/common';
import { CreateAuth, CreateAuthDto } from '@pure-workspace/domain';

@Injectable()
export class CreateAuthService {
  constructor(private useCase: CreateAuth) {}

  async create(createAuthDto: CreateAuthDto) {
    return await this.useCase.execute(createAuthDto);
  }
}
