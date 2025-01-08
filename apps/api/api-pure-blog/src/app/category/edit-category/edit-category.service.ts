import { Injectable } from '@nestjs/common';
import { EditCategory, EditCategoryDto } from '@pure-workspace/domain';

@Injectable()
export class EditCategoryService {
  constructor(private useCase: EditCategory) {}

  async edit(editCategoryDto: EditCategoryDto) {
    return await this.useCase.execute(editCategoryDto);
  }
}
