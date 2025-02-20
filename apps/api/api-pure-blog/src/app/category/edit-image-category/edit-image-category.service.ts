import { Injectable } from '@nestjs/common';
import {
  EditImageCategory,
  EditImageCategoryDto,
} from '@pure-workspace/domain';

@Injectable()
export class EditImageCategoryService {
  constructor(private useCase: EditImageCategory) {}

  async edit(editImageCategoryDto: EditImageCategoryDto) {
    return await this.useCase.execute(editImageCategoryDto);
  }
}
