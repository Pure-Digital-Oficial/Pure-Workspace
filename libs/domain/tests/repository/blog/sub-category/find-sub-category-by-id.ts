import {
  FindSubCategoryByIdRepository,
  SubCategoryResponseDto,
} from '../../../../src';
import { SubCategoryMock } from '../../../entity';

export class FindSubCategoryByIdRepositoryMock
  implements FindSubCategoryByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<SubCategoryResponseDto> {
    this.inputMock = id;
    return SubCategoryMock;
  }
}
