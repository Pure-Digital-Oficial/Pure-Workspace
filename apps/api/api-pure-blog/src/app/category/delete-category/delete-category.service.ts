import { Injectable } from '@nestjs/common';
import { DeleteCategory, DeleteCategoryDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteCategoryService {
  constructor(private useCase: DeleteCategory) {}

  async delete(deleteCategoryDto: DeleteCategoryDto) {
    return await this.useCase.execute(deleteCategoryDto);
  }
}
