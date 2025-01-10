import { Inject } from '@nestjs/common';
import {
  FindMediaPostByIdRepository,
  MediaPostResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../../application';

export class FindMediaPostByIdRepositoryImpl
  implements FindMediaPostByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<MediaPostResponseDto> {
    const filteredMediaPost = await this.prismaService[
      'generalPrisma'
    ].media.findFirst({
      where: {
        media_id: id,
      },
      select: {
        media_id: true,
        content: true,
        created_at: true,
        updated_at: true,
        name: true,
        thumbnail: true,
        url: true,
        user_created: {
          select: {
            name: true,
          },
        },
        user_updated: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      id: filteredMediaPost?.media_id ?? '',
      content: filteredMediaPost?.content ?? '',
      name: filteredMediaPost?.name ?? '',
      thumbnail: filteredMediaPost?.thumbnail ?? '',
      url: filteredMediaPost?.url ?? '',
      createdAt: filteredMediaPost?.created_at ?? new Date(),
      createdBy: filteredMediaPost?.user_created.name ?? '',
      updatedAt: filteredMediaPost?.updated_at ?? new Date(),
      updatedBy: filteredMediaPost?.user_updated.name ?? '',
    };
  }
}
