import { Inject } from '@nestjs/common';
import { DeletePlaylistRepoistory } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class DeletePlaylistRepositoryImpl implements DeletePlaylistRepoistory {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(id: string): Promise<void> {
    await this.prismaService.generalPrisma.playlist_X_Scheduling.deleteMany({
      where: {
        playlist_id: id,
      },
    });

    await this.prismaService.generalPrisma.playlist_X_Content_Files.deleteMany({
      where: {
        playlist_id: id,
      },
    });

    await this.prismaService.generalPrisma.playlist.delete({
      where: {
        playlist_id: id,
      },
    });
  }
}
