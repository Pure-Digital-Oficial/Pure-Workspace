import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { ChangeUserTypeService } from './change-user-type.service';
import {
  changeUserSchema,
  ErrorMessageResult,
  userTypes,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('change-user-type')
export class ChangeUserTypeController {
  constructor(private readonly changeUserTypeService: ChangeUserTypeService) {}

  @Put(':userId')
  @UsePipes(new ZodValidationPipe(changeUserSchema))
  async change(
    @Query('loggedUserId') loggedUserId: string,
    @Param('userId') userId: string,
    @Body() body: { type: string }
  ) {
    const result = await this.changeUserTypeService.change({
      loggedUserId,
      type: body.type as userTypes,
      userId,
    });

    if (result.isRight()) return { userId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
