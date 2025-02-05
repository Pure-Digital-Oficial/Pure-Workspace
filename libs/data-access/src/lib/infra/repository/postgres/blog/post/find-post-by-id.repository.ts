import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindPostByIdRepository,
  PostResponseDto,
} from '@pure-workspace/domain';

export class FindPostByIdRepositoryImpl implements FindPostByIdRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<PostResponseDto> {
    const findedPost = await this.prismaService['generalPrisma'].post.findFirst(
      {
        where: {
          post_id: id,
        },
        select: {
          post_id: true,
          content: true,
          description: true,
          sub_title: true,
          title: true,
          created_at: true,
          updated_at: true,
          status: true,
          cover_image: true,
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
      }
    );

    return {
      id: findedPost?.post_id ?? '',
      content: findedPost?.content ?? '',
      createdAt: findedPost?.created_at ?? new Date(),
      createdBy: findedPost?.user_created.name ?? '',
      description: findedPost?.description ?? '',
      subTitle: findedPost?.sub_title ?? '',
      title: findedPost?.title ?? '',
      updatedAt: findedPost?.updated_at ?? new Date(),
      updatedBy: findedPost?.user_updated.name ?? '',
      status: findedPost?.status ?? '',
      coverImage: findedPost?.cover_image ?? '',
    };
  }
}
