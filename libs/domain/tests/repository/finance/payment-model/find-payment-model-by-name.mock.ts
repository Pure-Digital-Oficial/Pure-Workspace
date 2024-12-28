import {
  FindPaymentModelByNameDto,
  FindPaymentModelByNameRepository,
  PaymentModelResponseDto,
} from '../../../../src';

export class FindPaymentModelByNameRepositoryMock
  implements FindPaymentModelByNameRepository
{
  inputMock = {} as FindPaymentModelByNameDto;
  async find(
    input: FindPaymentModelByNameDto
  ): Promise<PaymentModelResponseDto> {
    this.inputMock = input;
    return {} as PaymentModelResponseDto;
  }
}
