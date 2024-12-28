import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindCompanyDataByIdService } from './find-company-data-by-id.service';
import {
  ErrorMessageResult,
  findCompanyDataByIdSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('find-company-data-by-id')
export class FindCompanyDataByIdController {
  constructor(
    private readonly findCompanyDataByIdService: FindCompanyDataByIdService
  ) {}

  @Get(':companyDataId')
  @UsePipes(new ZodValidationPipe(findCompanyDataByIdSchema))
  async find(
    @Param('companyDataId') companyDataId: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.findCompanyDataByIdService.find({
      companyDataId,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
