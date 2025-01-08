import { Inject } from '@nestjs/common';
import {
  CreateMediaPostDto,
  CreateMediaPostRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../../application';

export class CreateMediaPostRepositoryImpl
  implements CreateMediaPostRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateMediaPostDto): Promise<string> {
    const { file, loggedUserId, postId, thumbnail } = input;

    const mediaPost = await this.prismaService['generalPrisma'].media.create({
      data: {
        thumbnail,
        content: '',
        name: file.originalname,
        url: file.path,
        created_by: loggedUserId,
        updated_by: loggedUserId,
        post_id: postId,
      },
    });

    return mediaPost?.media_id ?? '';
  }
}
