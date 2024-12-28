import { Inject } from '@nestjs/common';
import {
  CreatePreRegistrationDto,
  CreatePreRegistrationRepository,
} from '@pure-workspace/domain';
import { PrismaMarketingService } from '../../../../../application';

export class CreatePreRegistrationRepostioryImpl
  implements CreatePreRegistrationRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaMarketingService
  ) {}
  async create(input: CreatePreRegistrationDto): Promise<string> {
    const { sendingId } = input;
    const createdPreRegistration =
      await this.prismaService.marketingPrisma.pre_Registration.create({
        data: {
          sending_id: sendingId,
        },
      });

    return createdPreRegistration?.pre_registration_id ?? '';
  }
}
