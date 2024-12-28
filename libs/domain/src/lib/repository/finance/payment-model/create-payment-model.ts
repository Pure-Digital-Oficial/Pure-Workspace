import { CreatePaymentModelDto } from '../../../dto';

export interface CreatePaymentModelRepository {
  create(input: CreatePaymentModelDto): Promise<string>;
}
