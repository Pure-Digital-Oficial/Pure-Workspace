import { Body, Controller, Post, Query } from '@nestjs/common';
import {
  ErrorMessageResult,
  ExternalAuthBodyDto,
} from '@pure-workspace/domain';
import { ExternalAuthService } from './external-auth.service';

@Controller('external-auth')
export class ExternalAuthController {
  constructor(private readonly externalAuthService: ExternalAuthService) {}

  @Post()
  //@UsePipes(new ZodValidationPipe(createAuthSchema))
  async create(
    @Query('appId') appId: string,
    @Body() body: ExternalAuthBodyDto
  ) {
    const result = await this.externalAuthService.auth({
      appId: appId ?? '',
      body: body ?? ({} as ExternalAuthBodyDto),
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
