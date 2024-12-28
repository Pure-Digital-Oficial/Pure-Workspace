import { Inject } from '@nestjs/common';
import {
  VerifyUserPermissionsByIdRepository,
  PermissionsUserResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class VerifyUserPermissionsByIdRepositoryImpl
  implements VerifyUserPermissionsByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async verify(id: string): Promise<PermissionsUserResponseDto> {
    const result = await this.prismaService.generalPrisma.user.findFirst({
      where: {
        user_id: id,
      },
      select: {
        type: true,
        status: true,
      },
    });

    return {
      type: result?.type ?? '',
      status: result?.status ?? '',
    };
  }
}
