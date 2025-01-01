import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import {
  ErrorMessageResult,
  ExternalAuthBodyDto,
  externalAuthSchema,
} from '@pure-workspace/domain';
import { ExternalAuthService } from './external-auth.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('external-auth')
export class ExternalAuthController {
  constructor(private readonly externalAuthService: ExternalAuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(externalAuthSchema))
  async create(
    @Query('appId') appId: string,
    @Query('externalId') externalId: string,
    @Body() body: ExternalAuthBodyDto
  ) {
    const result = await this.externalAuthService.auth({
      appId: appId ?? '',
      externalId: externalId ?? '',
      body: body ?? ({} as ExternalAuthBodyDto),
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
