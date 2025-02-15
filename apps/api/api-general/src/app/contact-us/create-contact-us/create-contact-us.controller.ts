import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import {
  ContactUsBodyDto,
  createContactUsSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { CreateContactUsService } from './create-contact-us.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('create-contact-us')
export class CreateContactUsController {
  constructor(
    private readonly createContactUsService: CreateContactUsService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createContactUsSchema))
  async create(@Query('appId') appId: string, @Body() body: ContactUsBodyDto) {
    const result = await this.createContactUsService.create({
      body: body?.name ? body : ({} as ContactUsBodyDto),
      appId,
    });

    if (result.isRight()) return { contactId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
