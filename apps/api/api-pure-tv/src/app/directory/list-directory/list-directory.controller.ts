import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListDirectoryService } from './list-directory.service';
import {
  ErrorMessageResult,
  listDirectorySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('list-directory')
export class ListDirectoryController {
  constructor(private readonly listDirectoryService: ListDirectoryService) {}

  @UsePipes(new ZodValidationPipe(listDirectorySchema))
  @Get()
  async list(
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string
  ) {
    const result = await this.listDirectoryService.list({
      loggedUserId,
      companyId,
      userInput: filter,
      skip,
      take,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
