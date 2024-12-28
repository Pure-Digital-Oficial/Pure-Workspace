import { Injectable } from '@nestjs/common';
import { CreateProduct, CreateProductDto } from '@pure-workspace/domain';

@Injectable()
export class CreateProductService {
  constructor(private useCase: CreateProduct) {}

  async create(input: CreateProductDto) {
    return this.useCase.execute(input);
  }
}
