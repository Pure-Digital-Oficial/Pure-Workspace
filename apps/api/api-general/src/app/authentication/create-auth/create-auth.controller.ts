import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateAuthService } from './create-auth.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  CreateAuthDto,
  createAuthSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';

@Controller('create-auth')
export class CreateAuthController {
  constructor(private readonly createAuthService: CreateAuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAuthSchema))
  async create(@Body() input: CreateAuthDto) {
    const result = await this.createAuthService.create(input);

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
