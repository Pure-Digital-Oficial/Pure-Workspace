import {
  EditImageCategoryDto,
  EditImageCategoryRepository,
} from '../../../../src';
import { CategoryMock } from '../../../entity';

export class EditImageCategoryRepositoryMock
  implements EditImageCategoryRepository
{
  inputMock = {} as EditImageCategoryDto;
  async edit(input: EditImageCategoryDto): Promise<string> {
    this.inputMock = input;
    return CategoryMock.id;
  }
}
