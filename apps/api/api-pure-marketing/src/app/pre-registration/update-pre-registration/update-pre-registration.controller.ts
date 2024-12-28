import { Body, Controller, Param, Put } from '@nestjs/common';
import { ErrorMessageResult } from '@pure-workspace/domain';
import { UpdatePreRegistrationService } from './update-pre-registration.service';

@Controller('update-pre-registration')
export class UpdatePreRegistrationController {
  constructor(
    private readonly updatePreRegistrationService: UpdatePreRegistrationService
  ) {}

  @Put(':preRegistrationId')
  async update(
    @Param('preRegistrationId') preRegistrationId: string,
    @Body() input: { branchOfTheCompany: string }
  ) {
    const result = await this.updatePreRegistrationService.update({
      id: preRegistrationId,
      branchOfTheCompany: input?.branchOfTheCompany ?? '',
    });

    if (result.isRight()) return { preRegisrationId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
