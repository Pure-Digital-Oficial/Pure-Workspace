import { Inject } from '@nestjs/common';
import { App, FindAppByIdRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindAppByIdRepositoryImpl implements FindAppByIdRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: string): Promise<App> {
    const findedApp =
      await this.prismaService.generalPrisma.application.findFirst({
        where: {
          app_id: input,
        },
        select: {
          app_id: true,
          name: true,
        },
      });

    const mappedApp: App = {
      id: findedApp?.app_id ?? '',
      name: findedApp?.name ?? '',
    };

    return mappedApp;
  }
}
