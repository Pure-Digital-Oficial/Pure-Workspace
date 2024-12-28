import { Inject } from '@nestjs/common';
import {
  CompanyPrismaDto,
  ListCompanyDto,
  ListCompanyRepository,
  ListCompanyResponseDto,
  ListSimpleCompanyResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class ListCompanyRepositoryImpl implements ListCompanyRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListCompanyDto): Promise<ListCompanyResponseDto> {
    const { filter, loggedUserId } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(filter !== ''
        ? {
            OR: [
              {
                social_reason: {
                  contains: filter,
                  mode: 'insensitive' as const,
                },
              },
              {
                fantasy_name: {
                  contains: filter,
                  mode: 'insensitive' as const,
                },
              },
            ],
          }
        : {}),
    };

    const [companies, filteredTotal, total] =
      await this.prismaService.generalPrisma.$transaction([
        this.prismaService.generalPrisma.company.findMany({
          where: whereClause,
          select: {
            created_at: true,
            cnpj: true,
            company_id: true,
            fantasy_name: true,
            social_reason: true,
            status: true,
            user: {
              select: {
                nick_name: true,
              },
            },
            company_x_address: {
              select: {
                address: {
                  select: {
                    city: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
          skip: parseInt(skip.toString()),
          take: parseInt(take.toString()),
        }),
        this.prismaService.generalPrisma.company.count({
          where: whereClause,
        }),
        this.prismaService.generalPrisma.company.count({
          where: {
            user_id: loggedUserId,
          },
        }),
      ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedCompany: ListSimpleCompanyResponseDto[] = companies.map(
      (company: CompanyPrismaDto) => {
        return {
          id: company?.company_id ?? '',
          cnpj: company?.cnpj ?? '',
          fantasyName: company?.fantasy_name ?? '',
          socialReason: company?.social_reason ?? '',
          city: company?.company_x_address[0]?.address?.city?.name ?? '',
          createdBy: company?.user?.nick_name ?? '',
          createdAt: company?.created_at ?? '',
          status: company?.status ?? 'INACTIVE',
        };
      }
    );

    return {
      filteredTotal,
      total,
      totalPages,
      companies: mappedCompany,
    };
  }
}
