import { Injectable } from '@nestjs/common';
import { ListPostsDto, ListUserPosts } from '@pure-workspace/domain';

@Injectable()
export class ListUserPostsService {
  constructor(private useCase: ListUserPosts) {}

  async list(listPostsDto: ListPostsDto) {
    return await this.useCase.execute(listPostsDto);
  }
}
