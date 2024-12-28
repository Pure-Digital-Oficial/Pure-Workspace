import { Inject } from '@nestjs/common';
import {
  FindPlaylistToSchedulingByIdsRepository,
  PlaylistToSchedulingDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindPlaylistToSchedulingByIdsRepositoryImpl
  implements FindPlaylistToSchedulingByIdsRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: PlaylistToSchedulingDto): Promise<string> {
    const { playlistId, schedulingId } = input;

    const filteredPlaylistToScheduling =
      await this.prismaService.generalPrisma.playlist_X_Scheduling.findFirst({
        where: {
          playlist_id: playlistId,
          scheduling_id: schedulingId,
        },
      });

    return filteredPlaylistToScheduling === null
      ? ''
      : `${filteredPlaylistToScheduling?.playlist_id}-${filteredPlaylistToScheduling?.scheduling_id}`;
  }
}
