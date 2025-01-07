import { CreateCategoryDto, CreateCategoryRepository } from '../../../../src';
import { CategoryMock } from '../../../entity';

export class CreateCategoryRepositoryMock implements CreateCategoryRepository {
  inputMock = {} as CreateCategoryDto;
  async create(input: CreateCategoryDto): Promise<string> {
    this.inputMock = input;
    return CategoryMock.id;
  }
}
