import { Injectable } from '@nestjs/common';
import { EditProduct, EditProductDto } from '@pure-workspace/domain';

@Injectable()
export class EditProductService {
  constructor(private useCase: EditProduct) {}

  async edit(input: EditProductDto) {
    return this.useCase.execute(input);
  }
}
