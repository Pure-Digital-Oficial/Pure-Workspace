import { Inject } from '@nestjs/common';
import {
  DeleteMediaPostDto,
  DeleteMediaPostRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../../application';

export class DeleteMediaPostRepositoryImpl
  implements DeleteMediaPostRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(input: DeleteMediaPostDto): Promise<string> {
    const { mediaId } = input;

    const deletedMediapost = await this.prismaService[
      'generalPrisma'
    ].media.delete({
      where: {
        media_id: mediaId,
      },
    });

    return deletedMediapost.media_id ?? '';
  }
}
