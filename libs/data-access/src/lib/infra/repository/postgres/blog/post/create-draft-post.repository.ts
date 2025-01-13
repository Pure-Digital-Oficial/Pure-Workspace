import {
  CreateDraftPostRepository,
  CreatePostDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class CreateDraftPostRepositoryImpl
  implements CreateDraftPostRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreatePostDto): Promise<string> {
    const {
      appId,
      loggedUserId,
      body: { content, description, subTitle, title },
    } = input;

    const createdPost = await this.prismaService['generalPrisma'].post.create({
      data: {
        content,
        description,
        title,
        sub_title: subTitle,
        created_by: loggedUserId,
        updated_by: loggedUserId,
        status: 'BLOCKED',
        app_id: appId,
      },
    });

    return createdPost.post_id ?? '';
  }
}
