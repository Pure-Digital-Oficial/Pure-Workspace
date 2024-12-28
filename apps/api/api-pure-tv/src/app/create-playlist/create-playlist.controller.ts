import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreatePlaylistService } from './create-playlist.service';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { createPlaylistSchema } from '@pure-workspace/domain';

@Controller('create-playlist')
export class CreatePlaylistController {
  constructor(private readonly createPlaylistService: CreatePlaylistService) {}

  @UsePipes(new ZodValidationPipe(createPlaylistSchema))
  @Post()
  async create(
    @Body() input: { name: string },
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string,
    @Query('playlistCategoryId') playlistCategoryId: string
  ) {
    const result = await this.createPlaylistService.create({
      loggedUserId,
      companyId,
      name: input.name,
      playlistCategoryId,
    });

    if (result.isRight()) return { playlistId: result.value };
    else
      throw new BadRequestException({
        error: {
          name: result.value.name,
          message: result.value.message,
        },
      });
  }
}
