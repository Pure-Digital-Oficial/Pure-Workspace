import { Inject } from '@nestjs/common';
import { Company, FindCompanyByCnpjRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindCompanyByCnpjRepositoryImpl
  implements FindCompanyByCnpjRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(cnpj: string): Promise<Company> {
    const filteredCompany =
      await this.prismaService.generalPrisma.company.findFirst({
        where: {
          cnpj: cnpj,
        },
        select: {
          company_id: true,
          cnpj: true,
          fantasy_name: true,
          social_reason: true,
          created_at: true,
          user: {
            select: {
              nick_name: true,
            },
          },
        },
      });

    return {
      cnpj: filteredCompany?.cnpj ?? '',
      fantasyName: filteredCompany?.fantasy_name ?? '',
      id: filteredCompany?.company_id ?? '',
      socialReason: filteredCompany?.social_reason ?? '',
      createdBy: filteredCompany?.user?.nick_name ?? '',
      cretedAt: filteredCompany?.created_at ?? new Date(),
    };
  }
}
