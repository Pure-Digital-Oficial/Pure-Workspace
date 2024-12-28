import { Inject } from '@nestjs/common';
import {
  CreateCompanyResponsibleDto,
  CreateCompanyResponsibleRespository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class CreateCompanyResponsibleRespositoryImpl
  implements CreateCompanyResponsibleRespository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateCompanyResponsibleDto): Promise<string> {
    const createdCompanyResponsible =
      await this.prismaService.generalPrisma.company_Responsible.create({
        data: {
          cpf: input.body.document,
          email: input.body.email,
          name: input.body.name,
          phone: input.body.phone,
          birth_date: new Date(input.body.birthdate),
          company_id: input.companyId,
        },
      });

    return createdCompanyResponsible?.company_responsible_id ?? '';
  }
}
