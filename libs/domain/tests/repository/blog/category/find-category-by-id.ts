import {
  CategoryResponseDto,
  FindCategoryByIdRepository,
} from '../../../../src';
import { CategoryMock } from '../../../entity';

export class FindCategoryByIdRepositoryMock
  implements FindCategoryByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<CategoryResponseDto> {
    this.inputMock = id;
    return CategoryMock;
  }
}
