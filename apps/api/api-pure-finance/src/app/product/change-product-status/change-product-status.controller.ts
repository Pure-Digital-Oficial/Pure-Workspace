import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import {
  changeProductStatusSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ChangeProductStatusService } from './change-product-status.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('change-product-status')
export class ChangeProductStatusController {
  constructor(
    private readonly changeProductStatusService: ChangeProductStatusService
  ) {}

  @Put(':productId')
  @UsePipes(new ZodValidationPipe(changeProductStatusSchema))
  async change(
    @Query('loggedUserId') loggedUserId: string,
    @Param('productId') productId: string,
    @Body() body: { status: string }
  ) {
    const result = await this.changeProductStatusService.change({
      id: productId ?? '',
      status: body.status ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { productId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
