import { Injectable } from '@nestjs/common';
import { ListPosts, ListPostsDto } from '@pure-workspace/domain';

@Injectable()
export class ListPostsService {
  constructor(private useCase: ListPosts) {}

  async list(listPostsDto: ListPostsDto) {
    return await this.useCase.execute(listPostsDto);
  }
}
