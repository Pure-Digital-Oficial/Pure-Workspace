import { Inject } from '@nestjs/common';
import {
  DeleteContentFileByIdDto,
  DeleteContentFileByIdRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class DeleteContentFileByIdRepositoryImpl
  implements DeleteContentFileByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async delete(input: DeleteContentFileByIdDto): Promise<void> {
    await this.prismaService.generalPrisma.playlist_X_Content_Files.deleteMany({
      where: {
        Content_Files_id: input.idToDelete,
      },
    });

    await this.prismaService.generalPrisma.content_Files.delete({
      where: {
        Content_Files_id: input.idToDelete,
      },
    });
  }
}
