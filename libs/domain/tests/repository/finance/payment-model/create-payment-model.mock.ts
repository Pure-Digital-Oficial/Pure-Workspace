import {
  CreatePaymentModelDto,
  CreatePaymentModelRepository,
} from '../../../../src';
import { PaymentModelMock } from '../../../entity/finance';

export class CreatePaymentModelRepositoryMock
  implements CreatePaymentModelRepository
{
  inputMock = {} as CreatePaymentModelDto;
  async create(input: CreatePaymentModelDto): Promise<string> {
    this.inputMock = input;
    return PaymentModelMock.id;
  }
}
