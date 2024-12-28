import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { AddPlaylistsToSchedulingService } from './add-playlists-to-scheduling.service';
import {
  addPlaylistToSchedulingSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('add-playlists-to-scheduling')
export class AddPlaylistsToSchedulingController {
  constructor(
    private readonly addPlaylistsToSchedulingService: AddPlaylistsToSchedulingService
  ) {}

  @UsePipes(new ZodValidationPipe(addPlaylistToSchedulingSchema))
  @Post()
  async add(
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { playlistIds: string[] },
    @Query('schedulingId') schedulingId: string
  ) {
    const result = await this.addPlaylistsToSchedulingService.add({
      loggedUserId,
      playlistIds: body?.playlistIds ?? [],
      schedulingId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
