import { Inject } from '@nestjs/common';
import {
  CreateDirectoryDto,
  CreateDirectoryRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class CreateDirectoryRepositoryImpl
  implements CreateDirectoryRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}

  async create(input: CreateDirectoryDto): Promise<string> {
    const { body, loggedUserId, companyId } = input;

    const createdDirectory =
      await this.prismaService.generalPrisma.directory.create({
        data: {
          name: body.name,
          user_id: loggedUserId,
          company_id: companyId,
        },
      });

    return createdDirectory.directory_id;
  }
}
