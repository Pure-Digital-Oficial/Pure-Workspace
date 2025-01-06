import { Injectable } from '@nestjs/common';
import { DeletePost, DeletePostDto } from '@pure-workspace/domain';

@Injectable()
export class DeletePostService {
  constructor(private useCase: DeletePost) {}

  async delete(deletePostDto: DeletePostDto) {
    return await this.useCase.execute(deletePostDto);
  }
}
