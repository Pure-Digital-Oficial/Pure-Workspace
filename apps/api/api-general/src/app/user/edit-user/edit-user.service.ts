import { Injectable } from '@nestjs/common';
import { EditUser, EditUserDto } from '@pure-workspace/domain';

@Injectable()
export class EditUserService {
  constructor(private useCase: EditUser) {}

  async edit(input: EditUserDto) {
    return await this.useCase.execute(input);
  }
}
