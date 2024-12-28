import { Inject } from '@nestjs/common';
import {
  CreatePlaylistDto,
  CreatePlaylistRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class CreatePlaylistRepositoryImpl implements CreatePlaylistRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreatePlaylistDto): Promise<string> {
    const { loggedUserId, playlistCategoryId, companyId, name } = input;
    const playlistResult =
      await this.prismaService.generalPrisma.playlist.create({
        data: {
          user_id: loggedUserId,
          category_id: playlistCategoryId,
          name,
          company_id: companyId,
        },
      });

    return playlistResult.playlist_id;
  }
}
