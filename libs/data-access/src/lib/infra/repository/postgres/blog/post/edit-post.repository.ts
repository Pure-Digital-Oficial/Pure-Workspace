import { Inject } from '@nestjs/common';
import { EditPostDto, EditPostRepository } from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class EditPostRepositoryImpl implements EditPostRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditPostDto): Promise<string> {
    const {
      id,
      loggedUserId,
      body: { content, description, subTitle, title },
    } = input;

    const editedPost = await this.prismaService['generalPrisma'].post.update({
      where: {
        post_id: id,
      },
      data: {
        content,
        description,
        sub_title: subTitle,
        title,
        updated_by: loggedUserId,
      },
    });

    return editedPost.post_id ?? '';
  }
}
