import { Body, Controller, Put, Query, UsePipes } from '@nestjs/common';
import { EditUserService } from './edit-user.service';
import {
  BodyUserDto,
  editUserSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('edit-user')
export class EditUserController {
  constructor(private readonly editUserService: EditUserService) {}

  @Put()
  @UsePipes(new ZodValidationPipe(editUserSchema))
  async edit(
    @Body() input: BodyUserDto,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.editUserService.edit({
      body: input,
      loggedUserId,
    });

    if (result.isRight()) return { userId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
