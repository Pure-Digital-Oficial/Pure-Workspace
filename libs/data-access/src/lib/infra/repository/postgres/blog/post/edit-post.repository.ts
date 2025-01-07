import { Inject } from '@nestjs/common';
import { EditPostDto, EditPostRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class EditPostRepositoryImpl implements EditPostRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditPostDto): Promise<string> {
    const {
      id,
      loggedUserId,
      body: { content, description, subTitle, title },
    } = input;

    const editedPost = await this.prismaService.generalPrisma.post.update({
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
