import { Injectable } from '@nestjs/common';
import { CreateDraftPost, CreatePostDto } from '@pure-workspace/domain';

@Injectable()
export class CreateDraftPostService {
  constructor(private useCase: CreateDraftPost) {}

  async create(createPostDto: CreatePostDto) {
    return await this.useCase.execute(createPostDto);
  }
}
