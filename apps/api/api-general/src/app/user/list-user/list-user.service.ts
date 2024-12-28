import { Injectable } from '@nestjs/common';
import { ListUser, ListUserDto } from '@pure-workspace/domain';

@Injectable()
export class ListUserService {
  constructor(private useCase: ListUser) {}

  async list(input: ListUserDto) {
    return await this.useCase.execute(input);
  }
}
