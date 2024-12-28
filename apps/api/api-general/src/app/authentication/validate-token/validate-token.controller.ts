import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ErrorMessageResult } from '@pure-workspace/domain';
import { ValidateTokenService } from './validate-token.service';

@Controller('auth')
export class ValidateTokenController {
  constructor(private readonly validateTokenService: ValidateTokenService) {}

  @Get('validate-token')
  //@UsePipes(new ZodValidationPipe(createAuthSchema))
  async validate(
    @Headers('authorization') token: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.validateTokenService.validate({
      token: token ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { token: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
