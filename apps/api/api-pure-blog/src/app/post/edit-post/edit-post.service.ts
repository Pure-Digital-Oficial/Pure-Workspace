import { Injectable } from '@nestjs/common';
import { EditPost, EditPostDto } from '@pure-workspace/domain';

@Injectable()
export class EditPostService {
  constructor(private useCase: EditPost) {}

  async edit(editPostDto: EditPostDto) {
    return await this.useCase.execute(editPostDto);
  }
}
