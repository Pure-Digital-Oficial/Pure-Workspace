import { Inject } from '@nestjs/common';
import {
  DeletePlaylistFileDto,
  DeletePlaylistFileRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class DeletePlaylistFileRepositoryImpl
  implements DeletePlaylistFileRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(input: DeletePlaylistFileDto): Promise<void> {
    const { playlistId, fileId } = input;

    await this.prismaService.generalPrisma.playlist_X_Content_Files.deleteMany({
      where: {
        playlist_id: playlistId,
        Content_Files_id: fileId,
      },
    });
  }
}
