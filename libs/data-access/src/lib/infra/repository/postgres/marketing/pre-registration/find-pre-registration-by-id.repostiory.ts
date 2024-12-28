import { Inject } from '@nestjs/common';
import {
  FindPreRegistrationByIdRepository,
  PreRegistartionResponseDto,
} from '@pure-workspace/domain';
import { PrismaMarketingService } from '../../../../../application';

export class FindPreRegistrationByIdRepositoryImpl
  implements FindPreRegistrationByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaMarketingService
  ) {}
  async find(id: string): Promise<PreRegistartionResponseDto> {
    const filteredPreRegistration =
      await this.prismaService.marketingPrisma.pre_Registration.findFirst({
        where: {
          pre_registration_id: id,
        },
        select: {
          pre_registration_date: true,
          pre_registration_id: true,
          step: true,
        },
      });

    return {
      id: filteredPreRegistration?.pre_registration_id ?? '',
      createdAt: filteredPreRegistration?.pre_registration_date ?? new Date(),
      step: filteredPreRegistration?.step ?? 'INITIAL',
    };
  }
}
