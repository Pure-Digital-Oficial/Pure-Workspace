import { Inject } from '@nestjs/common';
import {
  AddUserToAnotherCompanyDto,
  AddUserToAnotherCompanyRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class AddUserToAnotherCompanyRepositoryImpl
  implements AddUserToAnotherCompanyRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async add(input: AddUserToAnotherCompanyDto): Promise<string> {
    const { companyId, userId } = input;

    const addedUser =
      await this.prismaService.generalPrisma.user_X_Company.create({
        data: {
          company_id: companyId,
          user_id: userId,
        },
      });

    return addedUser?.user_id
      ? `${addedUser?.user_id}-${addedUser?.company_id}`
      : '';
  }
}
