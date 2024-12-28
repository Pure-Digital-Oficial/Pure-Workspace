import { Inject } from '@nestjs/common';
import {
  RemoveUserAccessToTheCompanyDto,
  RemoveUserAccessToTheCompanyRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class RemoveUserAccessToTheCompanyRepositoryImpl
  implements RemoveUserAccessToTheCompanyRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async remove(input: RemoveUserAccessToTheCompanyDto): Promise<string> {
    const { companyId, userId } = input;

    const removedUserAccess =
      await this.prismaService.generalPrisma.user_X_Company.delete({
        where: {
          user_id_company_id: {
            company_id: companyId,
            user_id: userId,
          },
        },
      });

    return removedUserAccess?.company_id ?? '';
  }
}
