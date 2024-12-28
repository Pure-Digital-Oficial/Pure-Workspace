import { Inject } from '@nestjs/common';
import {
  CompanyResponsibleResponseDto,
  FindCompanyResponsibleByDocumentRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindCompanyResponsibleByDocumentRepositoryImpl
  implements FindCompanyResponsibleByDocumentRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(document: string): Promise<CompanyResponsibleResponseDto> {
    const filteredCompanyResponsible =
      await this.prismaService.generalPrisma.company_Responsible.findFirst({
        where: {
          cpf: document,
        },
        select: {
          cpf: true,
          email: true,
          name: true,
          phone: true,
          company_responsible_id: true,
          birth_date: true,
          created_at: true,
          updated_at: true,
        },
      });

    return {
      id: filteredCompanyResponsible?.company_responsible_id ?? '',
      document: filteredCompanyResponsible?.cpf ?? '',
      email: filteredCompanyResponsible?.email ?? '',
      name: filteredCompanyResponsible?.name ?? '',
      phone: filteredCompanyResponsible?.phone ?? '',
      birthdate: filteredCompanyResponsible?.birth_date ?? new Date(),
      createdAt: `${filteredCompanyResponsible?.created_at}`,
      updatedAt: `${filteredCompanyResponsible?.updated_at}`,
    };
  }
}
