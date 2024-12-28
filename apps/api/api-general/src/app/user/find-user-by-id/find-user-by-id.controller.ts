import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { FindUserByIdService } from './find-user-by-id.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { ErrorMessageResult, findUserByIdSchema } from '@pure-workspace/domain';

@Controller('find-user-by-id')
export class FindUserByIdController {
  constructor(private readonly findUserByIdService: FindUserByIdService) {}

  @UsePipes(new ZodValidationPipe(findUserByIdSchema))
  @Get(':id')
  async create(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.findUserByIdService.find({
      id,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
