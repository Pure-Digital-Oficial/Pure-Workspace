import { Injectable } from '@nestjs/common';
import { EditSubCategory, EditSubCategoryDto } from '@pure-workspace/domain';

@Injectable()
export class EditSubCategoryService {
  constructor(private useCase: EditSubCategory) {}

  async edit(editSubCategoryDto: EditSubCategoryDto) {
    return await this.useCase.execute(editSubCategoryDto);
  }
}
