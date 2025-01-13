import { Inject } from '@nestjs/common';
import {
  AddDraftToPostDto,
  AddDraftToPostRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../../application';

export class AddDraftToPostRepositoryImpl implements AddDraftToPostRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async add(input: AddDraftToPostDto): Promise<string> {
    const { id, loggedUserId } = input;

    const updatedPost = await this.prismaService['generalPrisma'].post.update({
      where: {
        post_id: id,
      },
      data: {
        status: 'BLOCKED',
        updated_by: loggedUserId,
        updated_at: new Date(),
      },
    });

    return updatedPost?.post_id ?? '';
  }
}
