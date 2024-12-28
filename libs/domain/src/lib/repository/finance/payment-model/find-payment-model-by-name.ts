import {
  FindPaymentModelByNameDto,
  PaymentModelResponseDto,
} from '../../../dto';

export interface FindPaymentModelByNameRepository {
  find(input: FindPaymentModelByNameDto): Promise<PaymentModelResponseDto>;
}
