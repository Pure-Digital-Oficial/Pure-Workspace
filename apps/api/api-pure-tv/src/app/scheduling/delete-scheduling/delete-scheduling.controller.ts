import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { DeleteSchedulingService } from './delete-scheduling.service';
import {
  deleteSchedulingSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-scheduling')
export class DeleteSchedulingController {
  constructor(
    private readonly deleteSchedulingService: DeleteSchedulingService
  ) {}

  @UsePipes(new ZodValidationPipe(deleteSchedulingSchema))
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deleteSchedulingService.delete({
      id,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
