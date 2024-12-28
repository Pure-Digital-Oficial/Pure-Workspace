import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { AddFileToPlaylistService } from './add-file-to-playlist.service';
import {
  addFileToPlaylistSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('add-file-to-playlist')
export class AddFileToPlaylistController {
  constructor(
    private readonly addFileToPlaylistService: AddFileToPlaylistService
  ) {}

  @UsePipes(new ZodValidationPipe(addFileToPlaylistSchema))
  @Post()
  async add(
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { filesId: string[] },
    @Query('playlistId') playlistId: string
  ) {
    const result = await this.addFileToPlaylistService.add({
      filesId: body.filesId,
      loggedUserId,
      playlistId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
