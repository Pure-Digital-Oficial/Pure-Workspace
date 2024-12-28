import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateCompanyDataService } from './create-company-data.service';
import {
  CompanyDataBodyDto,
  createCompanyDataSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('create-company-data')
export class CreateCompanyDataController {
  constructor(
    private readonly createCompanyDataService: CreateCompanyDataService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCompanyDataSchema))
  async create(
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string,
    @Body() body: CompanyDataBodyDto
  ) {
    const result = await this.createCompanyDataService.create({
      body: body?.legalNature ? body : ({} as CompanyDataBodyDto),
      companyId,
      loggedUserId,
    });

    if (result.isRight()) return { companyDataId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
