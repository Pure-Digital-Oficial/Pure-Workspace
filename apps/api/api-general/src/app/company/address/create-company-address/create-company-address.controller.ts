import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateCompanyAddressService } from './create-company-address.service';
import {
  CompanyBodyAddressDto,
  createCompanyAddressSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('create-company-address')
export class CreateCompanyAddressController {
  constructor(
    private readonly createCompanyAddressService: CreateCompanyAddressService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCompanyAddressSchema))
  async create(
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string,
    @Body() body: CompanyBodyAddressDto
  ) {
    const result = await this.createCompanyAddressService.create({
      body: body?.cityId.length > 0 ? body : ({} as CompanyBodyAddressDto),
      companyId: companyId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { companyAddressId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
