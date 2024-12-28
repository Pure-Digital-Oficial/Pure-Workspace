import { Controller, Param, Post, Query, UsePipes } from '@nestjs/common';
import { AddUserToAnotherCompanyService } from './add-user-to-another-company.service';
import {
  addUserToAnotherCompanySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('add-user-to-another-company')
export class AddUserToAnotherCompanyController {
  constructor(
    private readonly addUserToAnotherCompanyService: AddUserToAnotherCompanyService
  ) {}

  @Post(':userId')
  @UsePipes(new ZodValidationPipe(addUserToAnotherCompanySchema))
  async add(
    @Param('userId') userId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Query('companyId') companyId: string
  ) {
    const result = await this.addUserToAnotherCompanyService.add({
      companyId,
      loggedUserId,
      userId,
    });

    if (result.isRight()) return { userAndCompanyId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
