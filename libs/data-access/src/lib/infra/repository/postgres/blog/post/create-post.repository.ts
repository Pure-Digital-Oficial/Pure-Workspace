import { CreatePostDto, CreatePostRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';
import { Inject } from '@nestjs/common';

export class CreatePostRepositoryImpl implements CreatePostRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreatePostDto): Promise<string> {
    const {
      appId,
      loggedUserId,
      body: { content, description, subTitle, title },
    } = input;

    const createdPost = await this.prismaService.generalPrisma.post.create({
      data: {
        content,
        description,
        title,
        sub_title: subTitle,
        created_by: loggedUserId,
        updated_by: loggedUserId,
        status: 'ACTIVE',
        app_id: appId,
      },
    });

    return createdPost.post_id ?? '';
  }
}
