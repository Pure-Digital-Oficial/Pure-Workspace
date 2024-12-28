import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindCompanyAddressByIdService } from './find-company-address-by-id.service';
import {
  ErrorMessageResult,
  findCompanyAddressByIdSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('find-company-address-by-id')
export class FindCompanyAddressByIdController {
  constructor(
    private readonly findCompanyAddressByIdService: FindCompanyAddressByIdService
  ) {}

  @Get(':companyAddressId')
  @UsePipes(new ZodValidationPipe(findCompanyAddressByIdSchema))
  async find(
    @Query('loggedUserId') loggedUserId: string,
    @Param('companyAddressId') companyAddressId: string
  ) {
    const result = await this.findCompanyAddressByIdService.find({
      companyAddressId: companyAddressId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
