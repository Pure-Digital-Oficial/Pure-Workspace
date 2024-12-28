import { Inject } from '@nestjs/common';
import {
  MoveFileToDirectoryDto,
  MoveFileToDirectoryRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class MoveFileToDirectoryRepositoryImpl
  implements MoveFileToDirectoryRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async move(input: MoveFileToDirectoryDto): Promise<void> {
    const { idToMove, idToMoveDirectory } = input;

    await this.prismaService.generalPrisma.content_Files.update({
      where: {
        Content_Files_id: idToMove,
      },
      data: {
        directory_id: idToMoveDirectory,
      },
    });
  }
}
