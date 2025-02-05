import { Injectable } from '@nestjs/common';
import { EditMediaPost, EditMediaPostDto } from '@pure-workspace/domain';

@Injectable()
export class EditMediaPostService {
  constructor(private useCase: EditMediaPost) {}

  async edit(editMediaPostDto: EditMediaPostDto) {
    return await this.useCase.execute(editMediaPostDto);
  }
}
