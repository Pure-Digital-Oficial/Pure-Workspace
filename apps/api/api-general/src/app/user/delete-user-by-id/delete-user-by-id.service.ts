import { Injectable } from '@nestjs/common';
import { DeleteUserById, DeleteUserByIdDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteUserByIdService {
  constructor(private useCase: DeleteUserById) {}

  async delete(input: DeleteUserByIdDto) {
    return this.useCase.execute(input);
  }
}
