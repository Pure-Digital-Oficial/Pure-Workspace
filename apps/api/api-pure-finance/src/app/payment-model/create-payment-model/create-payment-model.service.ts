import { Injectable } from '@nestjs/common';
import {
  CreatePaymentModel,
  CreatePaymentModelDto,
} from '@pure-workspace/domain';

@Injectable()
export class CreatePaymentModelService {
  constructor(private useCase: CreatePaymentModel) {}

  async create(input: CreatePaymentModelDto) {
    return this.useCase.execute(input);
  }
}
