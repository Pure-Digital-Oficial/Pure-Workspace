import { DeleteCategoryDto, DeleteCategoryRepository } from '../../../../src';
import { CategoryMock } from '../../../entity';

export class DeleteCategoryRepositoryMock implements DeleteCategoryRepository {
  inputMock = {} as DeleteCategoryDto;
  async delete(input: DeleteCategoryDto): Promise<string> {
    this.inputMock = input;
    return CategoryMock.id;
  }
}
