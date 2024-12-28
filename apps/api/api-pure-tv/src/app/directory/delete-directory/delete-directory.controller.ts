import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { DeleteDirectoryService } from './delete-directory.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  deleteDirectoryByIdSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';

@Controller('delete-directory')
export class DeleteDirectoryController {
  constructor(
    private readonly deleteDirectoryService: DeleteDirectoryService
  ) {}

  @UsePipes(new ZodValidationPipe(deleteDirectoryByIdSchema))
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deleteDirectoryService.delete({
      id,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
