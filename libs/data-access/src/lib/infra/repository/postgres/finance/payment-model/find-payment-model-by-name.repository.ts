import { Inject } from '@nestjs/common';
import {
  FindPaymentModelByNameDto,
  FindPaymentModelByNameRepository,
  PaymentModelResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindPaymentModelByNameRepositoryImpl
  implements FindPaymentModelByNameRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(
    input: FindPaymentModelByNameDto
  ): Promise<PaymentModelResponseDto> {
    const { name } = input;

    const filteredPaymentModel =
      await this.prismaService.generalPrisma.paymentModel.findFirst({
        where: {
          name,
        },
      });

    return {
      id: filteredPaymentModel?.payment_model_id ?? '',
      createdAt: filteredPaymentModel?.created_at ?? new Date(),
      createdBy: filteredPaymentModel?.created_by ?? '',
      description: filteredPaymentModel?.description ?? '',
      name: filteredPaymentModel?.name ?? '',
      status: filteredPaymentModel?.status ?? '',
      updatedAt: filteredPaymentModel?.updated_at ?? new Date(),
    };
  }
}
