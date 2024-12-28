import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { EditCompanyResponsibleService } from './edit-company-responsible.service';
import {
  CompanyBodyResponsibleDto,
  editCompanyResponsibleSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('edit-company-responsible')
export class EditCompanyResponsibleController {
  constructor(
    private readonly editCompanyResponsibleService: EditCompanyResponsibleService
  ) {}

  @Put(':companyResponsibleId')
  @UsePipes(new ZodValidationPipe(editCompanyResponsibleSchema))
  async edit(
    @Query('loggedUserId') loggedUserId: string,
    @Param('companyResponsibleId') companyResponsibleId: string,
    @Body() body: Omit<CompanyBodyResponsibleDto, 'document'>
  ) {
    const result = await this.editCompanyResponsibleService.edit({
      body: body ?? {},
      companyResponsibleId: companyResponsibleId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { companyResponsibleId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
