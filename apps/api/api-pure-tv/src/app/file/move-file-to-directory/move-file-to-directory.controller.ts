import { Controller, Param, Post, Query, UsePipes } from '@nestjs/common';
import { MoveFileToDirectoryService } from './move-file-to-directory.service';
import {
  ErrorMessageResult,
  MoveFileToDirectoryDto,
  moveFileToDirectorySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('move-file-to-directory')
export class MoveFileToDirectoryController {
  constructor(
    private readonly moveFileToDirectoryService: MoveFileToDirectoryService
  ) {}

  @UsePipes(new ZodValidationPipe(moveFileToDirectorySchema))
  @Post(':id')
  async move(
    @Param('id') idToMove: string,
    @Query('idToMoveDirectory') idToMoveDirectory: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const dto: MoveFileToDirectoryDto = {
      idToMove,
      idToMoveDirectory,
      loggedUserId,
    };
    const result = await this.moveFileToDirectoryService.move(dto);

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
