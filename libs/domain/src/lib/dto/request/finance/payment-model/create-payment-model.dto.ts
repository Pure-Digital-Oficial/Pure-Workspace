import { PaymentModelBodyDto } from './payment-model-body.dto';

export interface CreatePaymentModelDto {
  loggedUserId: string;
  body: PaymentModelBodyDto;
}
