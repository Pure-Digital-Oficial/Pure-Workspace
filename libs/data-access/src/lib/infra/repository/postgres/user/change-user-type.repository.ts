import { Inject } from '@nestjs/common';
import {
  ChangeUserTypeDto,
  ChangeUserTypeRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class ChangeUserTypeRepositoryImpl implements ChangeUserTypeRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async change(input: ChangeUserTypeDto): Promise<string> {
    const { type, userId } = input;

    const changedUserType = await this.prismaService.generalPrisma.user.update({
      where: {
        user_id: userId,
      },
      data: {
        type: type,
        updated_at: new Date(),
      },
    });

    return changedUserType?.user_id ?? '';
  }
}
