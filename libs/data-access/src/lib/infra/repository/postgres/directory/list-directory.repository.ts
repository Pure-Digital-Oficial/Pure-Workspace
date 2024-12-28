import { Inject } from '@nestjs/common';
import {
  Directory,
  DirectoryPrismaDto,
  ListDirectoryDto,
  ListDirectoryRepository,
  ListDirectoryResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class ListDirectoryRepositoryImpl implements ListDirectoryRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(input: ListDirectoryDto): Promise<ListDirectoryResponseDto> {
    const { loggedUserId, userInput, companyId } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      user_id: loggedUserId,
      company_id: companyId,
      ...(userInput !== ''
        ? {
            name: {
              contains: userInput,
              mode: 'insensitive' as const,
            },
          }
        : {}),
    };

    const [directories, filteredTotal, total] =
      await this.prismaService.generalPrisma.$transaction([
        this.prismaService.generalPrisma.directory.findMany({
          where: whereClause,
          select: {
            directory_id: true,
            created_at: true,
            name: true,
            user: {
              select: {
                nick_name: true,
              },
            },
          },
          skip: parseInt(skip.toString()),
          take: parseInt(take.toString()),
        }),
        this.prismaService.generalPrisma.directory.count({
          where: whereClause,
        }),
        this.prismaService.generalPrisma.directory.count({
          where: {
            user_id: loggedUserId,
            company_id: companyId,
          },
        }),
      ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedDirectory: Directory[] = directories.map(
      (directory: DirectoryPrismaDto) => {
        return {
          id: directory.directory_id,
          name: directory.name,
        };
      }
    );

    return {
      filteredTotal,
      total,
      totalPages,
      directories: mappedDirectory,
    };
  }
}
