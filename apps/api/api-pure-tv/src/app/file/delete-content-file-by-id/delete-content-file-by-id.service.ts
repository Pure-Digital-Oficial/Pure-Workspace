import { Injectable } from '@nestjs/common';
import {
  DeleteContentFileById,
  DeleteContentFileByIdDto,
} from '@pure-workspace/domain';

@Injectable()
export class DeleteContentFileByIdService {
  constructor(private useCase: DeleteContentFileById) {}

  async delete(input: DeleteContentFileByIdDto) {
    return await this.useCase.execute(input);
  }
}
