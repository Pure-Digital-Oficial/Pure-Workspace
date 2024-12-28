import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { RemoveUserAccessToTheCompanyService } from './remove-user-access-to-the-company.service';
import {
  ErrorMessageResult,
  removeUserAccessToTheCompanySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('remove-user-access-to-the-company')
export class RemoveUserAccessToTheCompanyController {
  constructor(
    private readonly removeUserAccessToTheCompanyService: RemoveUserAccessToTheCompanyService
  ) {}

  @Delete(':userId')
  @UsePipes(new ZodValidationPipe(removeUserAccessToTheCompanySchema))
  async remove(
    @Param('userId') userId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string
  ) {
    const result = await this.removeUserAccessToTheCompanyService.remove({
      companyId,
      loggedUserId,
      userId,
    });

    if (result.isRight()) return { companyId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
