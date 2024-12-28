import { Controller, Get, Query } from '@nestjs/common';
import { FindUserByEmailService } from './find-user-by-email.service';
import { ErrorMessageResult } from '@pure-workspace/domain';

@Controller('find-user-by-email')
export class FindUserByEmailController {
  constructor(
    private readonly findUserByEmailService: FindUserByEmailService
  ) {}

  @Get()
  async find(@Query('email') email: string) {
    const result = await this.findUserByEmailService.find({ email });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
