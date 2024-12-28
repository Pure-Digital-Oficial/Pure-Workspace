import { Inject } from '@nestjs/common';
import {
  CompanySimpleResponseDto,
  FindUserByEmailDto,
  FindUserByEmailRepository,
  LoggedUser,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

type MappedCompany = {
  company: {
    company_id: string;
    fantasy_name: string;
    social_reason: string;
    cnpj: string;
  };
};

export class FindUserByEmailRepositoryImpl
  implements FindUserByEmailRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: FindUserByEmailDto): Promise<LoggedUser> {
    const { email } = input;
    const filteredUser = await this.prismaService.generalPrisma.user.findFirst({
      where: {
        auth: {
          some: {
            email: email,
          },
        },
      },
      select: {
        user_id: true,
        name: true,
        nick_name: true,
        birth_date: true,
        status: true,
        type: true,
        auth: {
          select: {
            auth_id: false,
            email: true,
            user_id: false,
          },
        },
        user_x_company: {
          select: {
            company: {
              select: {
                fantasy_name: true,
                company_id: true,
                cnpj: true,
                social_reason: true,
              },
            },
          },
        },
      },
    });

    const userCompanies: CompanySimpleResponseDto[] =
      filteredUser?.user_x_company.map((company: MappedCompany) => {
        return {
          id: company?.company.company_id ?? '',
          cnpj: company?.company?.cnpj ?? '',
          fantasyName: company?.company?.fantasy_name ?? '',
          socialReason: company?.company?.social_reason ?? '',
        };
      }) ?? [];

    return {
      id: filteredUser?.user_id ?? '',
      name: filteredUser?.name ?? '',
      email: filteredUser?.auth[0].email ?? '',
      type: filteredUser?.type ?? '',
      status: filteredUser?.status ?? '',
      companies: userCompanies,
      selectedCompany: userCompanies[0],
    };
  }
}
