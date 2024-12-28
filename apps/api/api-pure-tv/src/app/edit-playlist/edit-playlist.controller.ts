import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { EditPlaylistService } from './edit-playlist.service';
import { editPlaylistSchema, PlaylistBodyDto } from '@pure-workspace/domain';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

@Controller('edit-playlist')
export class EditPlaylistController {
  constructor(private readonly editPlaylistService: EditPlaylistService) {}

  @UsePipes(new ZodValidationPipe(editPlaylistSchema))
  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: PlaylistBodyDto
  ) {
    const result = await this.editPlaylistService.edit({
      body,
      id,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else
      throw new BadRequestException({
        error: {
          name: result.value.name,
          message: result.value.message,
        },
      });
  }
}
