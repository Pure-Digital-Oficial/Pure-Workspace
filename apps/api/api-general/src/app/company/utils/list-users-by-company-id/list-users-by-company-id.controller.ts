import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ListUsersByCompanyIdService } from './list-users-by-company-id.service';
import {
  ErrorMessageResult,
  listUsersByCompanyIdSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('list-users-by-company-id')
export class ListUsersByCompanyIdController {
  constructor(
    private readonly listUsersByCompanyIdService: ListUsersByCompanyIdService
  ) {}

  @Get(':companyId')
  @UsePipes(new ZodValidationPipe(listUsersByCompanyIdSchema))
  async list(
    @Param('companyId') companyId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('take') take: string,
    @Query('skip') skip: string,
    @Query('filter') filter: string
  ) {
    const result = await this.listUsersByCompanyIdService.list({
      companyId,
      filter,
      loggedUserId,
      take: parseInt(take),
      skip: parseInt(skip),
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
