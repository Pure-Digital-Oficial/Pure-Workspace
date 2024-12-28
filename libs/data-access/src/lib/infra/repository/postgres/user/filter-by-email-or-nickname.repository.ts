import { Inject } from '@nestjs/common';
import {
  Auth,
  AuthPrismaDto,
  FilterByEmailOrNicknameRepository,
  User,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FilterByEmailOrNicknameRepositoryImpl
  implements FilterByEmailOrNicknameRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}

  async filter(input: string): Promise<User> {
    const userResult = await this.prismaService.generalPrisma.user.findFirst({
      where: {
        OR: [
          {
            nick_name: input,
          },
          {
            auth: {
              some: {
                email: input,
              },
            },
          },
        ],
      },
      select: {
        user_id: true,
        name: true,
        nick_name: true,
        birth_date: true,
        type: true,
        auth: {
          select: {
            auth_id: true,
            email: true,
            user_id: true,
            status: true,
            password: true,
          },
        },
      },
    });

    const mappedAuth = userResult?.auth == null ? [] : userResult.auth;
    const findedAuth: Auth[] = mappedAuth.map((auth: AuthPrismaDto) => {
      return {
        authId: auth.auth_id,
        userId: auth.user_id,
        email: auth.email,
        status: auth.status,
        password: auth.password,
      };
    });

    const mappedUser: User = {
      name: userResult?.name == null ? '' : userResult.name,
      nickname: userResult?.nick_name == null ? '' : userResult.nick_name,
      type: userResult?.type == null ? '' : userResult?.type,
      birthDate:
        userResult?.birth_date == null ? new Date() : userResult.birth_date,
      userId: userResult?.user_id == null ? '' : userResult.user_id,
      auth: findedAuth,
    };

    return mappedUser;
  }
}
