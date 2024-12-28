import { Inject } from '@nestjs/common';
import { DeleteFileByPlaylistRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class DeleteFileByPlaylistRepositoryImpl
  implements DeleteFileByPlaylistRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(idPlaylist: string): Promise<void> {
    await this.prismaService.generalPrisma.playlist_X_Content_Files.deleteMany({
      where: {
        playlist_id: idPlaylist,
      },
    });
  }
}
