import { Injectable } from '@nestjs/common';
import { DeleteMediaPost, DeleteMediaPostDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteMediaPostService {
  constructor(private useCase: DeleteMediaPost) {}

  async delete(deleteMediaPostDto: DeleteMediaPostDto) {
    return await this.useCase.execute(deleteMediaPostDto);
  }
}
