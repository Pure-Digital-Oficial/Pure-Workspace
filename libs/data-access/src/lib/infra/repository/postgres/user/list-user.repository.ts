import { Inject } from '@nestjs/common';
import {
  ListUserDto,
  ListUserRepository,
  ListUserResponseDto,
  SimpleUserPrismaDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class ListUserRepositoryImpl implements ListUserRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}

  async list(input: ListUserDto): Promise<ListUserResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const [users, total] = await this.prismaService.generalPrisma.$transaction([
      this.prismaService.generalPrisma.user.findMany({
        where: {
          ...(input !== null
            ? {
                OR: [
                  { name: { contains: input.filter, mode: 'insensitive' } },
                  {
                    auth: {
                      some: {
                        email: { contains: input.filter, mode: 'insensitive' },
                      },
                    },
                  },
                ],
              }
            : {}),
        },
        orderBy: {
          name: 'asc',
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
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService.generalPrisma.user.count(),
    ]);

    const totalPages = Math.ceil(total / take);

    const mappedUsers = users.map((user: SimpleUserPrismaDto) => {
      return {
        name: user.name ?? '',
        nickname: user.nick_name ?? '',
        birthDate: user.birth_date ?? new Date(),
        userId: user.user_id ?? '',
        email: user.auth[0]?.email ?? '',
        status: user?.status ?? '',
        type: user?.type ?? '',
      };
    });
    return {
      total,
      totalPages,
      users: mappedUsers,
    };
  }
}
