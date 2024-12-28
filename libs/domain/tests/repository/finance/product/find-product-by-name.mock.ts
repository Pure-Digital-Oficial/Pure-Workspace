import {
  FindProductByNameDto,
  FindProductByNameRespository,
  ProductResponseDto,
} from '../../../../src';

export class FindProductByNameRespositoryMock
  implements FindProductByNameRespository
{
  inputMock = {} as FindProductByNameDto;
  async find(input: FindProductByNameDto): Promise<ProductResponseDto> {
    this.inputMock = input;
    return {} as ProductResponseDto;
  }
}
