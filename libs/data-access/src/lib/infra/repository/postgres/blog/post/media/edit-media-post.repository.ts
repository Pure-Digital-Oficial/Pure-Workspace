import { Inject } from '@nestjs/common';
import {
  EditMediaPostDto,
  EditMediaPostRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../../application';

export class EditMediaPostRepositoryImpl implements EditMediaPostRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditMediaPostDto): Promise<string> {
    const { loggedUserId, mediaId, name } = input;
    const editedMediaPost = await this.prismaService[
      'generalPrisma'
    ].media.update({
      where: {
        media_id: mediaId,
      },
      data: {
        name,
        updated_by: loggedUserId,
      },
    });

    return editedMediaPost?.media_id ?? '';
  }
}
