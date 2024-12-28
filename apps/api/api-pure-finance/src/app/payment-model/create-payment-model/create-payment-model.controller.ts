import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import {
  createPaymentModelSchema,
  ErrorMessageResult,
  PaymentModelBodyDto,
} from '@pure-workspace/domain';
import { CreatePaymentModelService } from './create-payment-model.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('create-payment-model')
export class CreatePaymentModelController {
  constructor(
    private readonly createPaymentModelService: CreatePaymentModelService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPaymentModelSchema))
  async create(
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: PaymentModelBodyDto
  ) {
    const result = await this.createPaymentModelService.create({
      body: body ?? ({} as PaymentModelBodyDto),
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { paymentModelId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
