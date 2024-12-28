import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ListPlaylistBySchedulingIdService } from './list-playlist-by-scheduling-id.service';
import {
  ErrorMessageResult,
  listPlaylistBySchedulingIdSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('list-playlist-by-scheduling-id')
export class ListPlaylistBySchedulingIdController {
  constructor(
    private readonly listPlaylistBySchedulingIdService: ListPlaylistBySchedulingIdService
  ) {}

  @UsePipes(new ZodValidationPipe(listPlaylistBySchedulingIdSchema))
  @Get(':id')
  async list(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number
  ) {
    const result = await this.listPlaylistBySchedulingIdService.list({
      id,
      loggedUserId,
      filter,
      skip,
      take,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
