import { Inject } from '@nestjs/common';
import {
  EditContentFileDto,
  EditContentFileRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class EditContentFileRepositoryImpl
  implements EditContentFileRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditContentFileDto): Promise<void> {
    const { directoryId, idToEdit, newFileName: originalName } = input;
    await this.prismaService.generalPrisma.content_Files.update({
      where: {
        Content_Files_id: idToEdit,
        directory_id: directoryId,
      },
      data: {
        original_name: originalName,
      },
    });
  }
}
