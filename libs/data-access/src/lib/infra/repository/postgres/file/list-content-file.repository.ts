import { Inject } from '@nestjs/common';
import {
  ContentFile,
  FilePrismaDto,
  ListContentFileDto,
  ListContentFileRepository,
  ListContentFileResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class ListContentFileRepositoryImpl
  implements ListContentFileRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListContentFileDto): Promise<ListContentFileResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 8;

    const [files, total] = await this.prismaService.generalPrisma.$transaction([
      this.prismaService.generalPrisma.content_Files.findMany({
        where: {
          user_id: input.loggedUserId,
          directory_id: input.directoryId,
          company_id: input.companyId,
          ...(input.userInput !== ''
            ? {
                original_name: {
                  contains: input.userInput,
                  mode: 'insensitive',
                },
              }
            : {}),
        },
        orderBy: {
          directory: {
            name: 'asc',
          },
        },
        select: {
          Content_Files_id: true,
          size: true,
          format: true,
          upload_date: true,
          file_name: true,
          path: true,
          original_name: true,
          thumbnail: true,
          user: {
            select: {
              nick_name: true,
            },
          },
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService.generalPrisma.content_Files.count({
        where: {
          user_id: input.loggedUserId,
          directory_id: input.directoryId,
          company_id: input.companyId,
          ...(input.userInput !== ''
            ? {
                original_name: {
                  contains: input.userInput,
                  mode: 'insensitive',
                },
              }
            : {}),
        },
      }),
    ]);

    const totalPages = Math.ceil(total / take);

    const mappedContentFiles: ContentFile[] = files.map(
      (file: FilePrismaDto) => {
        return {
          id: file.Content_Files_id,
          fileName: file.file_name,
          format: file.format,
          originalName: file.original_name,
          path: file.path,
          size: file.size,
          uploadDate: file.upload_date,
          created_by: file.user.nick_name,
          thumbnail: file.thumbnail ?? '',
        };
      }
    );

    return {
      total,
      totalPages,
      files: mappedContentFiles,
    };
  }
}
