import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  ListMediasPostDto,
  ListMediasPostRepository,
  ListMediasPostResponseDto,
  MediaPostResponseDto,
  MediaPostPrismaDto,
} from '@pure-workspace/domain';

export class ListMediasPostRepositoryImpl implements ListMediasPostRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(input: ListMediasPostDto): Promise<ListMediasPostResponseDto> {
    const { filter, postId } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(filter !== ''
        ? {
            name: {
              contains: filter,
              mode: 'insensitive' as const,
            },
            post_id: postId,
          }
        : {
            post_id: postId,
          }),
    };

    const [medias, filteredTotal, total] = await this.prismaService[
      'generalPrisma'
    ].$transaction([
      this.prismaService['generalPrisma'].media.findMany({
        where: {
          ...whereClause,
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
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['generalPrisma'].media.count({
        where: whereClause,
      }),
      this.prismaService['generalPrisma'].media.count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedMedias: MediaPostResponseDto[] = medias.map(
      (media: MediaPostPrismaDto) => {
        return {
          id: media?.media_id ?? '',
          content: media.content ?? '',
          name: media.name ?? '',
          thumbnail: media.thumbnail ?? '',
          url: media.url ?? '',
          createdAt: media.created_at ?? new Date(),
          createdBy: media.user_created.name ?? '',
          updatedAt: media.updated_at ?? new Date(),
          updatedBy: media.user_updated.name ?? '',
        };
      }
    );

    return {
      filteredTotal,
      total,
      totalPages,
      medias: mappedMedias,
    };
  }
}
