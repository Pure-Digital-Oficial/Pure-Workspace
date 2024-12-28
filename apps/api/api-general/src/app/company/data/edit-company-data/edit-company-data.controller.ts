import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { EditCompanyDataService } from './edit-company-data.service';
import {
  CompanyDataBodyDto,
  editCompanyDataSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('edit-company-data')
export class EditCompanyDataController {
  constructor(
    private readonly editCompanyDataService: EditCompanyDataService
  ) {}

  @Put(':companyDataId')
  @UsePipes(new ZodValidationPipe(editCompanyDataSchema))
  async edit(
    @Query('loggedUserId') loggedUserId: string,
    @Param('companyDataId') companyDataId: string,
    @Body() body: CompanyDataBodyDto
  ) {
    const result = await this.editCompanyDataService.edit({
      body: body?.legalNature.length < 1 ? ({} as CompanyDataBodyDto) : body,
      companyDataId,
      loggedUserId,
    });

    if (result.isRight()) return { companyDataId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
