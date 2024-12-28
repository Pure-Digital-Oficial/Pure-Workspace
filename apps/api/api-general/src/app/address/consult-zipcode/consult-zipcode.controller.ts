import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ConsultZipcodeService } from './consult-zipcode.service';
import { consultZipcodeSchema, ErrorMessageResult } from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('consult-zipcode')
export class ConsultZipcodeController {
  constructor(private readonly consultZipcodeService: ConsultZipcodeService) {}

  @Get(':zipcode')
  @UsePipes(new ZodValidationPipe(consultZipcodeSchema))
  async consult(
    @Query('loggedUserId') loggedUserId: string,
    @Param('zipcode') zipcode: string
  ) {
    const result = await this.consultZipcodeService.consult({
      loggedUserId,
      zipcode,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
