import { Controller, Post, Query } from '@nestjs/common';
import { CreatePreRegistrationService } from './create-pre-registration.service';
import { ErrorMessageResult } from '@pure-workspace/domain';

@Controller('create-pre-registration')
export class CreatePreRegistrationController {
  constructor(
    private readonly createPreRegistrationService: CreatePreRegistrationService
  ) {}

  @Post()
  async create(@Query('sendingId') sendingId: string) {
    const result = await this.createPreRegistrationService.create({
      sendingId,
    });

    if (result.isRight()) return { preRegisrationId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
