import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindAllCompanyIdsService } from './find-all-company-ids.service';
import {
  ErrorMessageResult,
  findAllCompanyIdsSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('find-all-company-ids')
export class FindAllCompanyIdsController {
  constructor(
    private readonly findAllCompanyIdsService: FindAllCompanyIdsService
  ) {}

  @Get(':companyId')
  @UsePipes(new ZodValidationPipe(findAllCompanyIdsSchema))
  async find(
    @Query('loggedUserId') loggedUserId: string,
    @Param('companyId') companyId: string
  ) {
    const result = await this.findAllCompanyIdsService.find({
      companyId,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
