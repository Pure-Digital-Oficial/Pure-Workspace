import { Controller, Param, Post, Query, UsePipes } from '@nestjs/common';
import { SelectCompanyService } from './select-company.service';
import {
  ErrorMessageResult,
  selectCompanySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('select-company')
export class SelectCompanyController {
  constructor(private readonly selectCompanyService: SelectCompanyService) {}

  @Post(':companyId')
  @UsePipes(new ZodValidationPipe(selectCompanySchema))
  async select(
    @Query('loggedUserId') loggedUserId: string,
    @Param('companyId') companyId: string
  ) {
    const result = await this.selectCompanyService.select({
      companyId,
      loggedUserId,
    });

    if (result.isRight()) return { companyId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
