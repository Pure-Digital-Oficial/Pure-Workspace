import { Injectable } from '@nestjs/common';
import {
  DeletePlaylistCategory,
  DeletePlaylistCategoryDto,
} from '@pure-workspace/domain';

@Injectable()
export class DeletePlaylistCategoryService {
  constructor(private useCase: DeletePlaylistCategory) {}

  async delete(input: DeletePlaylistCategoryDto) {
    return await this.useCase.execute(input);
  }
}
