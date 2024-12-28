import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindSimpleCompanyByIdService } from './find-simple-company-by-id.service';
import {
  ErrorMessageResult,
  findSimpleCompanyByIdSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('find-simple-company-by-id')
export class FindSimpleCompanyByIdController {
  constructor(
    private readonly findSimpleCompanyByIdService: FindSimpleCompanyByIdService
  ) {}

  @Get(':companyId')
  @UsePipes(new ZodValidationPipe(findSimpleCompanyByIdSchema))
  async find(
    @Query('loggedUserId') loggedUserId: string,
    @Param('companyId') companyId: string
  ) {
    const result = await this.findSimpleCompanyByIdService.find({
      companyId,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
