import { EditCategoryDto, EditCategoryRepository } from '../../../../src';
import { CategoryMock } from '../../../entity';

export class EditCategoryRepositoryMock implements EditCategoryRepository {
  inputMock = {} as EditCategoryDto;
  async edit(input: EditCategoryDto): Promise<string> {
    this.inputMock = input;
    return CategoryMock.id;
  }
}
