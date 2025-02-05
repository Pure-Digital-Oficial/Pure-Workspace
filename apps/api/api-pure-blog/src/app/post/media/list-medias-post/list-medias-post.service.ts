import { Injectable } from '@nestjs/common';
import { ListMediasPost, ListMediasPostDto } from '@pure-workspace/domain';

@Injectable()
export class ListMediasPostService {
  constructor(private useCase: ListMediasPost) {}

  async list(listMediasPostDto: ListMediasPostDto) {
    return await this.useCase.execute(listMediasPostDto);
  }
}
