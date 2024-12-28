import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { DeletePlaylistToSchedulingService } from './delete-playlist-to-scheduling.service';
import {
  deletePlaylistToSchedulingSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-playlist-to-scheduling')
export class DeletePlaylistToSchedulingController {
  constructor(
    private readonly deletePlaylistToSchedulingService: DeletePlaylistToSchedulingService
  ) {}

  @UsePipes(new ZodValidationPipe(deletePlaylistToSchedulingSchema))
  @Delete(':id')
  async delete(
    @Param('id') playlistId: string,
    @Query('schedulingId') schedulingId: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deletePlaylistToSchedulingService.delete({
      loggedUserId,
      playlistId,
      schedulingId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
