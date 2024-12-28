import { Injectable } from '@nestjs/common';
import { FindUserByEmail, FindUserByEmailDto } from '@pure-workspace/domain';

@Injectable()
export class FindUserByEmailService {
  constructor(private useCase: FindUserByEmail) {}

  async find(input: FindUserByEmailDto) {
    return await this.useCase.execute(input);
  }
}
