import { Injectable } from '@nestjs/common';
import {
  CreateSubCategory,
  CreateSubCategoryDto,
} from '@pure-workspace/domain';

@Injectable()
export class CreateSubCategoryService {
  constructor(private useCase: CreateSubCategory) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    return await this.useCase.execute(createSubCategoryDto);
  }
}
