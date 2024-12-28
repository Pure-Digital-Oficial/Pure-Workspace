import { Inject } from '@nestjs/common';
import {
  DeleteDirectoryDto,
  DeleteDirectoryRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class DeleteDirectoryRepositoryImpl
  implements DeleteDirectoryRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(input: DeleteDirectoryDto): Promise<void> {
    const { id } = input;

    await this.prismaService.generalPrisma.directory.delete({
      where: {
        directory_id: id,
      },
    });
  }
}
