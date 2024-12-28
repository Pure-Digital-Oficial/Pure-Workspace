import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { EditCompanyService } from './edit-company.service';
import {
  CompanyBodyDto,
  editCompanySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('edit-company')
@UsePipes(new ZodValidationPipe(editCompanySchema))
export class EditCompanyController {
  constructor(private readonly editCompanyService: EditCompanyService) {}

  @Put(':companyId')
  async edit(
    @Query('loggedUserId') loggedUserId: string,
    @Param('companyId') companyId: string,
    @Body() body: CompanyBodyDto
  ) {
    const result = await this.editCompanyService.edit({
      body: body?.cnpj.length < 1 ? ({} as CompanyBodyDto) : body,
      companyId,
      loggedUserId,
    });

    if (result.isRight()) return { companyId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
