import { Inject } from '@nestjs/common';
import {
  DeleteCompanyByIdDto,
  DeleteCompanyByIdRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class DeleteCompanyByIdRepositoryImpl
  implements DeleteCompanyByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(input: DeleteCompanyByIdDto): Promise<string> {
    const { companyId, description, loggedUserId } = input;
    const deletedCompany =
      await this.prismaService.generalPrisma.company.update({
        where: {
          company_id: companyId,
        },
        data: {
          status: 'INACTIVE',
          updated_at: new Date(),
        },
      });

    await this.prismaService.generalPrisma.confirm_Delete_Company.create({
      data: {
        company_id: companyId,
        description: description,
        responsibly_user: loggedUserId,
      },
    });

    return deletedCompany?.company_id ?? '';
  }
}
