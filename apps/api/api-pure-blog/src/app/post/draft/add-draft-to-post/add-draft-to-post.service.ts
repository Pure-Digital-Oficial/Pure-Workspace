import { Injectable } from '@nestjs/common';
import { AddDraftToPost, AddDraftToPostDto } from '@pure-workspace/domain';

@Injectable()
export class AddDraftToPostService {
  constructor(private useCase: AddDraftToPost) {}

  async add(addDraftToPostDto: AddDraftToPostDto) {
    return await this.useCase.execute(addDraftToPostDto);
  }
}
