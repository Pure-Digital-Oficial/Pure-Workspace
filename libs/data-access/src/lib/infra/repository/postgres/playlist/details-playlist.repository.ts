import { Inject } from '@nestjs/common';
import {
  DetailsPlaylistDto,
  DetailsPlaylistRepository,
  PlaylistResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class DetailsPlaylistRepositoryImpl
  implements DetailsPlaylistRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async details(input: DetailsPlaylistDto): Promise<PlaylistResponseDto> {
    const { playlistId } = input;

    const resultPlaylist =
      await this.prismaService.generalPrisma.playlist.findUnique({
        where: {
          playlist_id: playlistId,
        },
        select: {
          playlist_id: true,
          name: true,
          created_at: true,
          user: {
            select: {
              nick_name: true,
            },
          },
          category: {
            select: {
              playlist_category_id: true,
              name: true,
            },
          },
        },
      });

    const mappedPlaylist: PlaylistResponseDto = {
      category: {
        id: resultPlaylist?.category.playlist_category_id ?? '',
        name: resultPlaylist?.category.name ?? '',
      },
      created_at: resultPlaylist?.created_at ?? new Date(),
      created_by: resultPlaylist?.user.nick_name ?? '',
      name: resultPlaylist?.name ?? '',
      id: resultPlaylist?.playlist_id ?? '',
    };

    return mappedPlaylist;
  }
}
