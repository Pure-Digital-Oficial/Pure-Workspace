import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateCompanyService } from './create-company.service';
import {
  CompanyBodyDto,
  createCompanySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('create-company')
export class CreateCompanyController {
  constructor(private readonly createCompanyService: CreateCompanyService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCompanySchema))
  async create(
    @Body() body: CompanyBodyDto,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.createCompanyService.create({
      body,
      loggedUserId,
    });

    if (result.isRight()) return { companyId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
