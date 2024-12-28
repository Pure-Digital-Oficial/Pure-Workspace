import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateCompanyResponsibleService } from './create-company-responsible.service';
import {
  CompanyBodyResponsibleDto,
  createCompanyResponsibleSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('create-company-responsible')
export class CreateCompanyResponsibleController {
  constructor(
    private readonly createCompanyResponsibleService: CreateCompanyResponsibleService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCompanyResponsibleSchema))
  async create(
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string,
    @Body() body: CompanyBodyResponsibleDto
  ) {
    const result = await this.createCompanyResponsibleService.create({
      body: body ?? {},
      companyId: companyId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { companyResponsibleId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
