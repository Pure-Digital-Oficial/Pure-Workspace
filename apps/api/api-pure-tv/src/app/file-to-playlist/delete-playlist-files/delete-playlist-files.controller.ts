import { Body, Controller, Delete, Query, UsePipes } from '@nestjs/common';
import { DeletePlaylistFilesService } from './delete-playlist-files.service';
import {
  deletePlaylistFilesSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-playlist-files')
export class DeletePlaylistFilesController {
  constructor(
    private readonly deletePlaylistFilesService: DeletePlaylistFilesService
  ) {}

  @UsePipes(new ZodValidationPipe(deletePlaylistFilesSchema))
  @Delete()
  async delete(
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { filesId: string[] },
    @Query('playlistId') playlistId: string
  ) {
    const result = await this.deletePlaylistFilesService.delete({
      filesId: body.filesId,
      loggedUserId,
      playlistId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
