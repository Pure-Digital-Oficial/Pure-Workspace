import { Injectable } from '@nestjs/common';
import { DeleteProduct, DeleteProductDto } from '@pure-workspace/domain';

@Injectable()
export class DeleteProductService {
  constructor(private useCase: DeleteProduct) {}

  async delete(input: DeleteProductDto) {
    return this.useCase.execute(input);
  }
}
