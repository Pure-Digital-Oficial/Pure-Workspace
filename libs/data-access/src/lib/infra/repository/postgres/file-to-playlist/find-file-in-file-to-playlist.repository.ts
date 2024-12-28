import { Inject } from '@nestjs/common';
import {
  FindFileInFileToPlaylistDto,
  FindFileInFileToPlaylistRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindFileInFileToPlaylistRepositoryImpl
  implements FindFileInFileToPlaylistRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: FindFileInFileToPlaylistDto): Promise<string> {
    const filteredFile =
      await this.prismaService.generalPrisma.playlist_X_Content_Files.findFirst(
        {
          where: {
            Content_Files_id: input.fileId,
            playlist_id: input.playlsitId,
          },
        }
      );

    return filteredFile?.Content_Files_id ?? '';
  }
}
