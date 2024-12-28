import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { DeleteContentFileByIdService } from './delete-content-file-by-id.service';
import {
  DeleteContentFileByIdDto,
  deleteContentFileByIdSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-content-file-by-id')
export class DeleteContentFileByIdController {
  constructor(
    private readonly deleteContentFileByIdService: DeleteContentFileByIdService
  ) {}

  @UsePipes(new ZodValidationPipe(deleteContentFileByIdSchema))
  @Delete(':id')
  async delete(
    @Param('id') idToDelete: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('directoryId') directoryId: string
  ) {
    const dto: DeleteContentFileByIdDto = {
      directoryId,
      loggedUserId,
      idToDelete,
    };
    const result = await this.deleteContentFileByIdService.delete(dto);

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
