import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ConsultCompanyByCnpjService } from './consult-company-by-cnpj.service';
import {
  consultCompanyByCnpjSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('consult-company-by-cnpj')
export class ConsultCompanyByCnpjController {
  constructor(
    private readonly consultCompanyByCnpjService: ConsultCompanyByCnpjService
  ) {}

  @Get(':cnpj')
  @UsePipes(new ZodValidationPipe(consultCompanyByCnpjSchema))
  async consult(
    @Param('cnpj') cnpj: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.consultCompanyByCnpjService.consult({
      cnpj,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
