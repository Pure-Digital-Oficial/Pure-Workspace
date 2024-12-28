import { Inject } from '@nestjs/common';
import {
  Directory,
  FindDirectoryByNameDto,
  FindDirectoryByNameRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindDirectoryByNameRepositoryImpl
  implements FindDirectoryByNameRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}

  async find(input: FindDirectoryByNameDto): Promise<Directory> {
    const filteredDirectory =
      await this.prismaService.generalPrisma.directory.findFirst({
        where: {
          AND: [{ name: input.name }, { user_id: input.loggedUserId }],
        },
        select: {
          name: true,
          directory_id: true,
        },
      });

    if (!filteredDirectory) {
      return {} as Directory;
    }

    const mappedDirectory: Directory = {
      id: filteredDirectory?.directory_id ?? '',
      name: filteredDirectory?.name ?? '',
    };
    return mappedDirectory;
  }
}
