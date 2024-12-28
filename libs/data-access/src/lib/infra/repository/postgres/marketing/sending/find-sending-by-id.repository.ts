import {
  FindSendingByIdRepository,
  SendingResponseDto,
} from '@pure-workspace/domain';
import { PrismaMarketingService } from '../../../../../application';
import { Inject } from '@nestjs/common';

export class FindSendingByIdRepositoryImpl
  implements FindSendingByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaMarketingService
  ) {}
  async find(id: string): Promise<SendingResponseDto> {
    const filteredSending =
      await this.prismaService.marketingPrisma.sending.findFirst({
        where: {
          sending_id: id,
        },
        select: {
          sending_id: true,
        },
      });

    return {
      id: filteredSending?.sending_id ?? '',
    };
  }
}
