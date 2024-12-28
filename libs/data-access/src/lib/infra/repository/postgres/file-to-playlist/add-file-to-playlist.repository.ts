import { Inject } from '@nestjs/common';
import {
  AddFileToPlaylistDto,
  AddFileToPlaylistRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class AddFileToPlaylistRepositoryImpl
  implements AddFileToPlaylistRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async add(input: AddFileToPlaylistDto): Promise<string[]> {
    const { filesId, playlistId } = input;
    const listId: string[] = [];
    for (const file of filesId) {
      const createdFileToPlaylist =
        await this.prismaService.generalPrisma.playlist_X_Content_Files.create({
          data: {
            playlist_id: playlistId,
            Content_Files_id: file,
          },
        });

      listId.push(
        `${createdFileToPlaylist.Content_Files_id}-${createdFileToPlaylist.playlist_id}`
      );
    }

    return listId;
  }
}
