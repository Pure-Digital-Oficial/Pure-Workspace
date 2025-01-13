import { Injectable } from '@nestjs/common';
import { DeleteDraftPost, DeleteDraftPostDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteDraftPostService {
  constructor(private useCase: DeleteDraftPost) {}

  async delete(deleteDraftPostDto: DeleteDraftPostDto) {
    return await this.useCase.execute(deleteDraftPostDto);
  }
}
