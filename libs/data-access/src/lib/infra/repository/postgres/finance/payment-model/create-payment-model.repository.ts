import { Inject } from '@nestjs/common';
import {
  CreatePaymentModelDto,
  CreatePaymentModelRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class CreatePaymentModelRepositoryImpl
  implements CreatePaymentModelRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreatePaymentModelDto): Promise<string> {
    const {
      body: { description, name },
      loggedUserId,
    } = input;

    const createdPaymentModel =
      await this.prismaService.generalPrisma.paymentModel.create({
        data: {
          description,
          name,
          created_at: new Date(),
          created_by: loggedUserId,
        },
      });

    return createdPaymentModel.payment_model_id ?? '';
  }
}
