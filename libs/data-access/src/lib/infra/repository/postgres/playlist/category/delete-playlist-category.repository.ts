import { Inject } from '@nestjs/common';
import { DeletePlaylistCategoryRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class DeletePlaylistCategoryRepositoryImpl
  implements DeletePlaylistCategoryRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(id: string): Promise<void> {
    await this.prismaService.generalPrisma.playlist_Category.delete({
      where: {
        playlist_category_id: id,
      },
    });
  }
}
