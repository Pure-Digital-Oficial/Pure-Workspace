import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { EditCompanyAddressService } from './edit-company-address.service';
import {
  CompanyBodyAddressDto,
  editCompanyAddressSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('edit-company-address')
export class EditCompanyAddressController {
  constructor(
    private readonly editCompanyAddressService: EditCompanyAddressService
  ) {}

  @Put(':companyAddressId')
  @UsePipes(new ZodValidationPipe(editCompanyAddressSchema))
  async edit(
    @Query('loggedUserId') loggedUserId: string,
    @Param('companyAddressId') companyAddressId: string,
    @Body() body: CompanyBodyAddressDto
  ) {
    const result = await this.editCompanyAddressService.edit({
      body: body?.cityId.length > 0 ? body : ({} as CompanyBodyAddressDto),
      companyAddressId: companyAddressId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { companyAddressId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
