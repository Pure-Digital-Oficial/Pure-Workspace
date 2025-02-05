import { Injectable } from '@nestjs/common';
import { ListCategory, ListCategoryDto } from '@pure-workspace/domain';

@Injectable()
export class ListCategoryService {
  constructor(private useCase: ListCategory) {}

  async list(listCategoryDto: ListCategoryDto) {
    return await this.useCase.execute(listCategoryDto);
  }
}
