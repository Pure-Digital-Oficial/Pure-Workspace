import { Inject } from '@nestjs/common';
import {
  EditCompanyDataDto,
  EditCompanyDataRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class EditCompanyDataRepositoryImpl
  implements EditCompanyDataRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditCompanyDataDto): Promise<string> {
    const {
      body: { legalNature, opening, phone, port, responsibleEmail, situation },
      companyDataId,
    } = input;

    const editedCompany =
      await this.prismaService.generalPrisma.company_Data.update({
        where: {
          company_data_id: companyDataId,
        },
        data: {
          legal_nature: legalNature,
          opening: opening,
          phone: phone,
          port: port,
          responsible_email: responsibleEmail,
          situation: situation,
        },
      });

    return editedCompany?.company_data_id ?? '';
  }
}
