import { Injectable } from '@nestjs/common';
import { CreateCategory, CreateCategoryDto } from '@pure-workspace/domain';

@Injectable()
export class CreateCategoryService {
  constructor(private useCase: CreateCategory) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.useCase.execute(createCategoryDto);
  }
}
