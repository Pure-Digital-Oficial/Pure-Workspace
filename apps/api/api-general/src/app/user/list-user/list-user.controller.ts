import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListUserService } from './list-user.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { ErrorMessageResult, listUserSchema } from '@pure-workspace/domain';

@Controller('list-user')
export class ListUserController {
  constructor(private readonly listUserService: ListUserService) {}

  @UsePipes(new ZodValidationPipe(listUserSchema))
  @Get()
  async getListUsers(
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.listUserService.list({
      filter: filter ?? '',
      loggedUserId: loggedUserId ?? '',
      skip,
      take,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
