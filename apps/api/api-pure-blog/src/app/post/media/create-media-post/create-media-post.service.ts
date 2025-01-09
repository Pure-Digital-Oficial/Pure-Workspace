import { Injectable } from '@nestjs/common';
import { CreateMediasPost, CreateMediasPostDto } from '@pure-workspace/domain';

@Injectable()
export class CreateMediaPostService {
  constructor(private useCase: CreateMediasPost) {}

  async create(createMediasPostDto: CreateMediasPostDto) {
    return await this.useCase.execute(createMediasPostDto);
  }
}
