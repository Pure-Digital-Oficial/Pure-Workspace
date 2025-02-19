import { EditSubCategoryDto, EditSubCategoryRepository } from '../../../../src';
import { SubCategoryMock } from '../../../entity';

export class EditSubCategoryRepositoryMock
  implements EditSubCategoryRepository
{
  inputMock = {} as EditSubCategoryDto;
  async edit(input: EditSubCategoryDto): Promise<string> {
    this.inputMock = input;
    return SubCategoryMock.id;
  }
}
