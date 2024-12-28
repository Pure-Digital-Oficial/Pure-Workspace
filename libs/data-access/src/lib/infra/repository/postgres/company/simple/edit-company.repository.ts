import { Inject } from '@nestjs/common';
import { EditCompanyDto, EditCompanyRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class EditCompanyRepositoryImpl implements EditCompanyRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditCompanyDto): Promise<string> {
    const {
      body: { cnpj, fantasyName, socialReason },
      companyId,
    } = input;

    const editedCompany = await this.prismaService.generalPrisma.company.update(
      {
        where: {
          company_id: companyId,
        },
        data: {
          cnpj: cnpj,
          fantasy_name: fantasyName,
          social_reason: socialReason,
        },
      }
    );

    return editedCompany?.company_id ?? '';
  }
}
