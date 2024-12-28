import {
  CompanyResponseDto,
  ConsultCompanyByCnpjDto,
} from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function ConsultCompanyByCnpjRequest(
  input: ConsultCompanyByCnpjDto
) {
  const result = await generalApi.get<CompanyResponseDto>(
    `consult-company-by-cnpj/${input.cnpj}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
