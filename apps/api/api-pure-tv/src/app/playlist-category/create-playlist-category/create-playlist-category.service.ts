import { Injectable } from '@nestjs/common';
import {
  CreatePlaylistCategory,
  CreatePlaylistCategoryDto,
} from '@pure-workspace/domain';

@Injectable()
export class CreatePlaylistCategoryService {
  constructor(private useCase: CreatePlaylistCategory) {}

  async create(input: CreatePlaylistCategoryDto) {
    return this.useCase.execute(input);
  }
}
