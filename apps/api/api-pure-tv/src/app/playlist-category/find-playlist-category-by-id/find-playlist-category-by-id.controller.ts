import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindPlaylistCategoryByIdService } from './find-playlist-category-by-id.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  ErrorMessageResult,
  findPlaylistCategoryByIdSchema,
} from '@pure-workspace/domain';

@Controller('find-playlist-category-by-id')
export class FindPlaylistCategoryByIdController {
  constructor(
    private readonly findPlaylistCategoryByIdService: FindPlaylistCategoryByIdService
  ) {}

  @UsePipes(new ZodValidationPipe(findPlaylistCategoryByIdSchema))
  @Get(':id')
  async find(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.findPlaylistCategoryByIdService.find({
      id,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
