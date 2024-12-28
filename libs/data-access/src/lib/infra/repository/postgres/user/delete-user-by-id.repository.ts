import { Inject } from '@nestjs/common';
import {
  DeleteUserByIdDto,
  DeleteUserByIdRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class DeleteUserByIdRepositoryImpl implements DeleteUserByIdRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(input: DeleteUserByIdDto): Promise<string> {
    await this.prismaService.generalPrisma.confirm_Delete_User.create({
      data: {
        user_id: input.id,
        description: input.description,
        responsibly_user: input.loggedUser,
      },
    });

    const updatedUser = await this.prismaService.generalPrisma.user.update({
      where: {
        user_id: input.id,
      },
      data: {
        status: 'INACTIVE',
      },
    });

    return updatedUser.user_id;
  }
}
