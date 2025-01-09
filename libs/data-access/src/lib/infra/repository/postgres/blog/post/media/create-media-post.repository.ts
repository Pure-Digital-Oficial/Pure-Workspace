import { Inject } from '@nestjs/common';
import {
  CreateMediaPostDto,
  CreateMediaPostRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class CreateMediaPostRepositoryImpl
  implements CreateMediaPostRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreateMediaPostDto): Promise<string> {
    const { file, loggedUserId, postId, thumbnail } = input;

    const mediaPost = await this.prismaService['generalPrisma'].media.create({
      data: {
        thumbnail,
        content: file.originalname.split('.')[1],
        name: file.originalname.split('.')[0],
        url: file.path,
        created_by: loggedUserId,
        updated_by: loggedUserId,
        post_id: postId,
      },
    });

    return mediaPost?.media_id ?? '';
  }
}
