import { Inject } from '@nestjs/common';
import {
  EditPlaylistDto,
  EditPlaylistRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class EditPlaylistRepositoryImpl implements EditPlaylistRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditPlaylistDto): Promise<void> {
    const { id, body } = input;

    await this.prismaService.generalPrisma.playlist.update({
      where: {
        playlist_id: id,
      },
      data: {
        name: body.name,
        category_id: body.playlistCategoryId,
      },
    });
  }
}
