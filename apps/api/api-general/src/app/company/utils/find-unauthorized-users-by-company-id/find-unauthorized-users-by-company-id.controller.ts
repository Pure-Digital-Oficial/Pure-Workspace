import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindUnauthorizedUsersByCompanyIdService } from './find-unauthorized-users-by-company-id.service';
import {
  ErrorMessageResult,
  findUnauthorizedUsersByCompanyIdSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('find-unauthorized-users-by-company-id')
export class FindUnauthorizedUsersByCompanyIdController {
  constructor(
    private readonly findUnauthorizedUsersByCompanyIdService: FindUnauthorizedUsersByCompanyIdService
  ) {}

  @Get(':companyId')
  @UsePipes(new ZodValidationPipe(findUnauthorizedUsersByCompanyIdSchema))
  async find(
    @Query('loggedUserId') loggedUserId: string,
    @Param('companyId') companyId: string
  ) {
    const result = await this.findUnauthorizedUsersByCompanyIdService.find({
      companyId,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
