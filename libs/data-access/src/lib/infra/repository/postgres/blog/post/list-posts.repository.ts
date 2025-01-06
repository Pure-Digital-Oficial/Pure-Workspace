import { Inject } from '@nestjs/common';
import {
  ListPostsDto,
  ListPostsRepository,
  ListPostsResponseDto,
  PostPrismaDto,
  PostResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class ListPostsRepositoryImpl implements ListPostsRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListPostsDto): Promise<ListPostsResponseDto> {
    const { filter, appId } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(filter !== ''
        ? {
            title: {
              contains: filter,
              mode: 'insensitive' as const,
            },
            app_id: appId,
          }
        : {}),
    };

    const [posts, filteredTotal, total] =
      await this.prismaService.generalPrisma.$transaction([
        this.prismaService.generalPrisma.post.findMany({
          where: whereClause,
          select: {
            post_id: true,
            content: true,
            description: true,
            sub_title: true,
            title: true,
            created_at: true,
            updated_at: true,
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
        this.prismaService.generalPrisma.post.count({
          where: whereClause,
        }),
        this.prismaService.generalPrisma.post.count(),
      ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedPost: PostResponseDto[] = posts.map((post: PostPrismaDto) => {
      return {
        content: post.content,
        createdAt: post.created_at,
        createdBy: post.user_created.name,
        description: post.description,
        id: post.post_id,
        subTitle: post.sub_title,
        title: post.title,
        updatedAt: post.updated_at,
        updatedBy: post.user_updated.name,
      };
    });

    return {
      filteredTotal,
      total,
      totalPages,
      posts: mappedPost,
    };
  }
}
