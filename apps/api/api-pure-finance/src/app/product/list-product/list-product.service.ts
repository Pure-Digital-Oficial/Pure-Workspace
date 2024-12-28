import { Injectable } from '@nestjs/common';
import { ListProduct, ListProductDto } from '@pure-workspace/domain';

@Injectable()
export class ListProductService {
  constructor(private useCase: ListProduct) {}

  async list(input: ListProductDto) {
    return this.useCase.execute(input);
  }
}
