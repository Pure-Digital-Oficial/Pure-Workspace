import { Injectable } from '@nestjs/common';
import { ListUserPosts, ListUserPostsDto } from '@pure-workspace/domain';

@Injectable()
export class ListUserPostsService {
  constructor(private useCase: ListUserPosts) {}

  async list(listUserPostsDto: ListUserPostsDto) {
    return await this.useCase.execute(listUserPostsDto);
  }
}
