import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common';
import { FindPlaylistByIdService } from './find-playlist-by-id.service';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { findPlaylistByIdSchema } from '@pure-workspace/domain';

@Controller('find-playlist-by-id')
export class FindPlaylistByIdController {
  constructor(
    private readonly findPlaylistByIdService: FindPlaylistByIdService
  ) {}

  @UsePipes(new ZodValidationPipe(findPlaylistByIdSchema))
  @Get(':id')
  async find(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.findPlaylistByIdService.find({
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
