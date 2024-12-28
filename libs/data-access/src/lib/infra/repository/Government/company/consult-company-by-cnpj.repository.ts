import {
  ConsultCompanyByCnpjRepository,
  ConsultCompanyBrDto,
  CompanyResponseDto,
} from '@pure-workspace/domain';
import axios from 'axios';

export class ConsultCompanyByCnpjRepositoryImpl
  implements ConsultCompanyByCnpjRepository
{
  async consult(cnpj: string): Promise<CompanyResponseDto> {
    const url = process.env['NX_PUBLIC_CONSULT_CNPJ_URL'] ?? '';

    const response = await axios.get<ConsultCompanyBrDto>(`${url}/${cnpj}`);

    const { data } = response;
    if (!data?.cnpj) {
      return {} as CompanyResponseDto;
    }

    return {
      data: {
        id: '',
        port: data.porte,
        legalNature: data.natureza_juridica,
        opening: data.abertura,
        situation: data.situacao,
        phone: data.telefone,
        responsibleEmail: data.email,
      },
      address: {
        id: '',
        city: data.municipio,
        complement: data.complemento,
        country: 'Brasil',
        district: data.bairro,
        number: data.numero,
        state: data.uf,
        street: data.logradouro,
        zipcode: data.cep,
      },
      simple: {
        id: '',
        cnpj,
        fantasyName: data.fantasia,
        socialReason: data.nome,
      },
    };
  }
}
