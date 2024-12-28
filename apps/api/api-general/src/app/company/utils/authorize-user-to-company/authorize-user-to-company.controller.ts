import { Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { AuthorizeUserToCompanyService } from './authorize-user-to-company.service';
import {
  authorizeUserToCompanySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('authorize-user-to-company')
export class AuthorizeUserToCompanyController {
  constructor(
    private readonly authorizeUserToCompanyService: AuthorizeUserToCompanyService
  ) {}

  @Put(':userId')
  @UsePipes(new ZodValidationPipe(authorizeUserToCompanySchema))
  async auth(
    @Param('userId') userId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string
  ) {
    const result = await this.authorizeUserToCompanyService.auth({
      companyId,
      loggedUserId,
      userId,
    });

    if (result.isRight()) return { companyId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
