import { Inject } from '@nestjs/common';
import {
  AuthorizeUserToCompanyDto,
  AuthorizeUserToCompanyRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class AuthorizeUserToCompanyRepositoryImpl
  implements AuthorizeUserToCompanyRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async auth(input: AuthorizeUserToCompanyDto): Promise<string> {
    const { userId } = input;
    const authorizedUser = await this.prismaService.generalPrisma.user.update({
      where: {
        user_id: userId,
      },
      data: {
        status: 'ACTIVE',
        updated_at: new Date(),
      },
    });

    return authorizedUser.user_id ?? '';
  }
}
