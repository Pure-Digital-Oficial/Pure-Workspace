import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  DeletePostDto,
  DeleteDraftPostRepository,
} from '@pure-workspace/domain';

export class DeleteDraftPostRepositoryImpl
  implements DeleteDraftPostRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeletePostDto): Promise<string> {
    const { id } = input;
    const deletedPost = await this.prismaService['generalPrisma'].post.delete({
      where: {
        post_id: id,
      },
    });

    return deletedPost.post_id ?? '';
  }
}
