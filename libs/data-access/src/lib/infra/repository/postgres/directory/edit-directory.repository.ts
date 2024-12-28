import { Inject } from '@nestjs/common';
import { EditDirectoryDto, EditDirectoryRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class EditDirectoryRepositoryImpl implements EditDirectoryRepository {
  constructor(
    @Inject('PrismaService')
    private prismaService: PrismaGeneralService
  ) {}

  async edit(input: EditDirectoryDto): Promise<string> {
    const { id, newName } = input;

    const editedDirectory =
      await this.prismaService.generalPrisma.directory.update({
        where: {
          directory_id: id,
        },
        data: {
          name: newName,
        },
      });

    return editedDirectory.directory_id;
  }
}
