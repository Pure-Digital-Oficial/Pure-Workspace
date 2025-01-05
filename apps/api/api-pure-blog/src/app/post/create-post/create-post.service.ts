import { Injectable } from '@nestjs/common';
import { CreatePost, CreatePostDto } from '@pure-workspace/domain';

@Injectable()
export class CreatePostService {
  constructor(private useCase: CreatePost) {}

  async create(createPostDto: CreatePostDto) {
    return await this.useCase.execute(createPostDto);
  }
}
