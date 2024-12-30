import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { EditDirectoryService } from './edit-directory.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  editDirectorySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';

@Controller('edit-directory')
export class EditDirectoryController {
  constructor(private readonly editDirectoryService: EditDirectoryService) {}

  @UsePipes(new ZodValidationPipe(editDirectorySchema))
  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: { newName: string }
  ) {
    const result = await this.editDirectoryService.edit({
      id,
      loggedUserId,
      newName: body?.newName ?? '',
    });

    if (result.isRight()) return { directoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
