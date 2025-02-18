import {
  CreateSubCategoryDto,
  CreateSubCategoryRepository,
} from '../../../../src';
import { SubCategoryMock } from '../../../entity';

export class CreateSubCategoryRepositoryMock
  implements CreateSubCategoryRepository
{
  inputMock = {} as CreateSubCategoryDto;
  async create(input: CreateSubCategoryDto): Promise<string> {
    this.inputMock = input;
    return SubCategoryMock.id;
  }
}
