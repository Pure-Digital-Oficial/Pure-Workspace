import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { UnauthorizeUserToCompanyService } from './unauthorize-user-to-company.service';
import {
  ErrorMessageResult,
  unauthorizeUserToCompanySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('unauthorize-user-to-company')
export class UnauthorizeUserToCompanyController {
  constructor(
    private readonly unauthorizeUserToCompanyService: UnauthorizeUserToCompanyService
  ) {}

  @Delete(':userId')
  @UsePipes(new ZodValidationPipe(unauthorizeUserToCompanySchema))
  async auth(
    @Param('userId') userId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string
  ) {
    const result = await this.unauthorizeUserToCompanyService.auth({
      companyId,
      loggedUserId,
      userId,
    });

    if (result.isRight()) return { userCompanyId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
