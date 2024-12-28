import { Inject } from '@nestjs/common';
import {
  FindPlaylistByIdRepository,
  PlaylistResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindPlaylistByIdRepositoryImpl
  implements FindPlaylistByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<PlaylistResponseDto> {
    const filteredPlaylist =
      await this.prismaService.generalPrisma.playlist.findFirst({
        where: {
          playlist_id: id,
        },
        select: {
          playlist_id: true,
          name: true,
          created_at: true,
          category: {
            select: {
              name: true,
              playlist_category_id: true,
            },
          },
          user: {
            select: {
              nick_name: true,
            },
          },
        },
      });

    return {
      category: {
        id: filteredPlaylist?.category.playlist_category_id ?? '',
        name: filteredPlaylist?.category.name ?? '',
      },
      created_at: filteredPlaylist?.created_at ?? new Date(),
      created_by: filteredPlaylist?.user.nick_name ?? '',
      id: filteredPlaylist?.playlist_id ?? '',
      name: filteredPlaylist?.name ?? '',
    };
  }
}
