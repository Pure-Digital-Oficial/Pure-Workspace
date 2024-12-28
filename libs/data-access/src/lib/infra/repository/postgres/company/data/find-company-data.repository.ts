import { Inject } from '@nestjs/common';
import {
  CompanyDataResponseDto,
  FindCompanyDataByIdRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindCompanyDataByIdRepositoryImpl
  implements FindCompanyDataByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<CompanyDataResponseDto> {
    const filteredCompanyData =
      await this.prismaService.generalPrisma.company_Data.findFirst({
        where: {
          company_data_id: id,
        },
        select: {
          company_data_id: true,
          legal_nature: true,
          opening: true,
          phone: true,
          port: true,
          situation: true,
          responsible_email: true,
        },
      });

    return {
      id: filteredCompanyData?.company_data_id ?? '',
      legalNature: filteredCompanyData?.legal_nature ?? '',
      opening: filteredCompanyData?.opening ?? '',
      phone: filteredCompanyData?.phone ?? '',
      port: filteredCompanyData?.port ?? '',
      situation: filteredCompanyData?.situation ?? '',
      responsibleEmail: filteredCompanyData?.responsible_email ?? '',
    };
  }
}
