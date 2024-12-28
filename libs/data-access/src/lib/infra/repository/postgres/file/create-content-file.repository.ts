import { Inject } from '@nestjs/common';
import {
  CreateContentFileRepository,
  RegisterContentFileDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class CreateContentFileRepositoryImpl
  implements CreateContentFileRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: RegisterContentFileDto): Promise<string> {
    const { file, loggedUserId, directoryId, thumbnail, companyId } = input;
    const createdContentVideo =
      await this.prismaService.generalPrisma.content_Files.create({
        data: {
          original_name: file.originalname.split('.')[0],
          format: file.mimetype,
          size: file.size.toString(),
          user_id: loggedUserId,
          path: file.path,
          directory_id: directoryId,
          file_name: file.filename,
          thumbnail,
          company_id: companyId,
        },
      });
    return createdContentVideo.Content_Files_id;
  }
}
