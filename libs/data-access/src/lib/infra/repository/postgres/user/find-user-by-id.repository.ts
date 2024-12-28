import { Inject } from '@nestjs/common';
import { FindUserByIdRepository, UserList } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindUserByIdRepositoryImpl implements FindUserByIdRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}

  async find(id: string): Promise<UserList> {
    const userResult = await this.prismaService.generalPrisma.user.findFirst({
      where: {
        user_id: id,
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
            auth_id: true,
            email: true,
            password: true,
          },
        },
      },
    });

    const mappedUser: UserList = {
      name: userResult?.name ?? '',
      nickname: userResult?.nick_name ?? '',
      birthDate: userResult?.birth_date ?? new Date(),
      userId: userResult?.user_id ?? '',
      email: userResult?.auth[0]?.email ?? '',
      status: userResult?.status ?? '',
      type: userResult?.type ?? '',
    };

    return mappedUser;
  }
}
