import { Inject } from '@nestjs/common';
import { VerifyUserStatusByIdRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class VerifyUserStatusByIdRepositoryImpl
  implements VerifyUserStatusByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async verify(input: string): Promise<string> {
    const result = await this.prismaService.generalPrisma.user.findFirst({
      where: {
        user_id: input,
      },
      select: {
        status: true,
      },
    });

    return result?.status ?? '';
  }
}
