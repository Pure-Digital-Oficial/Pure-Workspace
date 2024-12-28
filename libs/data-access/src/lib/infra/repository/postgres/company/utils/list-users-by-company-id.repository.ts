import { Inject } from '@nestjs/common';
import {
  ListUsersByCompanyIdDto,
  ListUsersByCompanyIdRepository,
  ListUsersByCompanyIdResponseDto,
  UserPrismaDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class ListUsersByCompanyIdRepositoryImpl
  implements ListUsersByCompanyIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(
    input: ListUsersByCompanyIdDto
  ): Promise<ListUsersByCompanyIdResponseDto> {
    const { filter, companyId } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      company_id: companyId,
      ...(filter !== ''
        ? {
            OR: [
              {
                user: {
                  is: {
                    name: {
                      contains: input.filter,
                      mode: 'insensitive' as const,
                    },
                  },
                },
              },
              {
                user: {
                  is: {
                    auth: {
                      some: {
                        email: {
                          contains: input.filter,
                          mode: 'insensitive' as const,
                        },
                      },
                    },
                  },
                },
              },
            ],
          }
        : {}),
    };

    const [users, filteredTotal, total] =
      await this.prismaService.generalPrisma.$transaction([
        this.prismaService.generalPrisma.user_X_Company.findMany({
          where: whereClause,
          select: {
            user_id: true,
            user: {
              select: {
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
              },
            },
          },
          orderBy: {
            user: {
              name: 'asc',
            },
          },
          skip: parseInt(skip.toString()),
          take: parseInt(take.toString()),
        }),
        this.prismaService.generalPrisma.user_X_Company.count({
          where: whereClause,
        }),
        this.prismaService.generalPrisma.user_X_Company.count({
          where: {
            company_id: companyId,
          },
        }),
      ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedUsers = users.map((user: UserPrismaDto) => {
      return {
        name: user.user.name ?? '',
        nickname: user.user.nick_name ?? '',
        birthDate: user.user.birth_date ?? new Date(),
        userId: user.user_id ?? '',
        email: user.user.auth[0]?.email ?? '',
        status: user.user?.status ?? '',
        type: user.user.type ?? '',
      };
    });

    return {
      users: mappedUsers,
      total,
      filteredTotal,
      totalPages,
    };
  }
}
