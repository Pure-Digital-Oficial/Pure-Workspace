import { Inject } from '@nestjs/common';
import {
  ListPlaylistDto,
  ListPlaylistResponseDto,
  ListPlaylistRepository,
  Playlist,
  PlaylistPrismaDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class ListPlaylistRepositoryImpl implements ListPlaylistRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListPlaylistDto): Promise<ListPlaylistResponseDto> {
    const { loggedUserId, companyId, userInput } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      user_id: loggedUserId,
      company_id: companyId,
      ...(userInput !== ''
        ? {
            name: {
              contains: userInput,
              mode: 'insensitive' as const,
            },
          }
        : {}),
    };

    const [playlists, filteredTotal, total] =
      await this.prismaService.generalPrisma.$transaction([
        this.prismaService.generalPrisma.playlist.findMany({
          where: whereClause,
          select: {
            playlist_id: true,
            created_at: true,
            name: true,
            user: {
              select: {
                nick_name: true,
              },
            },
            category: {
              select: {
                name: true,
              },
            },
          },
          skip: parseInt(skip.toString()),
          take: parseInt(take.toString()),
        }),
        this.prismaService.generalPrisma.playlist.count({
          where: whereClause,
        }),
        this.prismaService.generalPrisma.playlist.count({
          where: {
            user_id: loggedUserId,
            company_id: companyId,
          },
        }),
      ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedPlaylist: Playlist[] = playlists.map(
      (playlist: PlaylistPrismaDto) => {
        return {
          category: playlist.category.name,
          created_at: playlist.created_at,
          created_by: playlist.user.nick_name,
          id: playlist.playlist_id,
          name: playlist.name,
        };
      }
    );

    return {
      filteredTotal,
      total,
      totalPages,
      playlists: mappedPlaylist,
    };
  }
}
