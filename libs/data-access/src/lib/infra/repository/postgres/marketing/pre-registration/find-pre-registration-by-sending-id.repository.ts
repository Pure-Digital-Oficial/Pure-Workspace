import {
  FindPreRegistrationBySendingIdRepository,
  PreRegistartionResponseDto,
} from '@pure-workspace/domain';
import { PrismaMarketingService } from '../../../../../application';
import { Inject } from '@nestjs/common';

export class FindPreRegistrationBySendingIdRepositoryImpl
  implements FindPreRegistrationBySendingIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaMarketingService
  ) {}
  async find(id: string): Promise<PreRegistartionResponseDto> {
    const filteredPreRegistration =
      await this.prismaService.marketingPrisma.pre_Registration.findFirst({
        where: {
          sending_id: id,
        },
        orderBy: {
          pre_registration_date: 'desc',
        },
      });

    return {
      id: filteredPreRegistration?.pre_registration_id ?? '',
      createdAt: filteredPreRegistration?.pre_registration_date ?? new Date(),
      step: filteredPreRegistration?.step ?? 'INITIAL',
    };
  }
}
