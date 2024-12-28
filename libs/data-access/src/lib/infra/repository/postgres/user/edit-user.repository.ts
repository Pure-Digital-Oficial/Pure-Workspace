import { Inject } from '@nestjs/common';
import { EditUserDto, EditUserRepository, userTypes } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class EditUserRepositoryImpl implements EditUserRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditUserDto): Promise<string> {
    const {
      body: { id, name, birthDate, status, type },
    } = input;

    const editedUser = await this.prismaService.generalPrisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        name,
        ...(Object.keys({ birthDate }).length > 1
          ? { birth_date: birthDate }
          : {}),
        status: status,
        updated_at: new Date(),
        type: type as userTypes,
      },
    });

    return editedUser.user_id;
  }
}
