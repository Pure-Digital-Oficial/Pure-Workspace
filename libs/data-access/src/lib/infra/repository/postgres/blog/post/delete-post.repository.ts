import { Inject } from '@nestjs/common';
import { DeletePostDto, DeletePostRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class DeletePostRepositoryImpl implements DeletePostRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(input: DeletePostDto): Promise<string> {
    const { id } = input;
    const deletedPost = await this.prismaService.generalPrisma.post.update({
      where: {
        post_id: id,
      },
      data: {
        status: 'INACTIVE',
      },
    });

    return deletedPost.post_id ?? '';
  }
}
