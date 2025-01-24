import { CreatePostDto, CreatePostRepository } from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class CreatePostRepositoryImpl implements CreatePostRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreatePostDto): Promise<string> {
    const {
      appId,
      loggedUserId,
      body: { content, description, subTitle, title, coverImage },
    } = input;

    const createdPost = await this.prismaService['generalPrisma'].post.create({
      data: {
        content,
        description,
        title,
        sub_title: subTitle,
        created_by: loggedUserId,
        updated_by: loggedUserId,
        status: 'ACTIVE',
        app_id: appId,
        cover_image: coverImage,
      },
    });

    return createdPost.post_id ?? '';
  }
}
