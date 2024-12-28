import { Inject } from '@nestjs/common';
import {
  ContentFile,
  FindFilesByPlaylistDto,
  FindFilesByPlaylistRepository,
  FindFilesByPlaylistResponseDto,
  FindToPlaylistPrismaDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindFilesByPlaylistRepositoryImpl
  implements FindFilesByPlaylistRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(
    input: FindFilesByPlaylistDto
  ): Promise<FindFilesByPlaylistResponseDto> {
    const { idPlaylist } = input;
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const [files, total] = await this.prismaService.generalPrisma.$transaction([
      this.prismaService.generalPrisma.playlist_X_Content_Files.findMany({
        where: {
          playlist_id: idPlaylist,
        },
        select: {
          playlist_id: true,
          created_at: true,
          Content_Files: {
            select: {
              Content_Files_id: true,
              size: true,
              format: true,
              created_at: true,
              file_name: true,
              path: true,
              original_name: true,
              user: {
                select: {
                  nick_name: true,
                },
              },
            },
          },
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService.generalPrisma.playlist_X_Content_Files.count({
        where: {
          playlist_id: idPlaylist,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / take);

    const mappedFiles: ContentFile[] = files.map(
      (file: FindToPlaylistPrismaDto) => {
        return {
          id: file.Content_Files.Content_Files_id,
          size: file.Content_Files.size,
          format: file.Content_Files.format,
          uploadDate: file.Content_Files.created_at,
          fileName: file.Content_Files.file_name,
          created_by: file.Content_Files.user.nick_name,
          originalName: file.Content_Files.original_name,
          path: file.Content_Files.path,
        };
      }
    );

    return {
      total,
      totalPages,
      files: mappedFiles,
    };
  }
}
