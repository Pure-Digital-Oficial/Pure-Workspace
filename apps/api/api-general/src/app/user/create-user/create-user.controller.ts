import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  CreateUserDto,
  CreateUserResponseDto,
  createUserSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';

@Controller('create-user')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() input: CreateUserDto) {
    const result = await this.createUserService.create(input);
    const response: CreateUserResponseDto = {
      user_id: `${result.value}`,
    };

    if (result.isRight()) return response;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
