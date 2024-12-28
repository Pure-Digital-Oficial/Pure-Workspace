import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ListCompaniesByUserIdService } from './list-companies-by-user-id.service';
import {
  ErrorMessageResult,
  listUsersByCompanyIdSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('list-companies-by-user-id')
export class ListCompaniesByUserIdController {
  constructor(
    private readonly listCompaniesByUserIdService: ListCompaniesByUserIdService
  ) {}

  @Get(':userId')
  @UsePipes(new ZodValidationPipe(listUsersByCompanyIdSchema))
  async list(
    @Param('userId') userId: string,
    @Query('filter') filter: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('take') take: string,
    @Query('skip') skip: string
  ) {
    const result = await this.listCompaniesByUserIdService.list({
      filter,
      loggedUserId,
      userId,
      take: parseInt(take),
      skip: parseInt(skip),
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
