import { Inject } from '@nestjs/common';
import {
  CreateCompanyDto,
  CreateCompanyRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class CreateCompanyRepositoryImpl implements CreateCompanyRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateCompanyDto): Promise<string> {
    const {
      body: { cnpj, fantasyName, socialReason },
      loggedUserId,
    } = input;

    const createdCompany =
      await this.prismaService.generalPrisma.company.create({
        data: {
          cnpj: cnpj,
          fantasy_name: fantasyName,
          social_reason: socialReason,
          user_id: loggedUserId,
        },
      });

    await this.prismaService.generalPrisma.user_X_Company.create({
      data: {
        company_id: createdCompany?.company_id ?? '',
        user_id: loggedUserId,
      },
    });

    return createdCompany?.company_id ?? '';
  }
}
