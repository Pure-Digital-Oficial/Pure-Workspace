import { Inject } from '@nestjs/common';
import {
  MoveFileToAnotherPlaylistDto,
  MoveFileToAnotherPlaylistRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class MoveFileToAnotherPlaylistRepositoryImpl
  implements MoveFileToAnotherPlaylistRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async move(input: MoveFileToAnotherPlaylistDto): Promise<void> {
    const { fileId, newPlaylistId, oldPlaylistId } = input;

    await this.prismaService.generalPrisma.playlist_X_Content_Files.updateMany({
      where: {
        playlist_id: oldPlaylistId,
        Content_Files_id: fileId,
      },
      data: {
        playlist_id: newPlaylistId,
      },
    });
  }
}
