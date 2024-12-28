import {
  CompanyDataResponseDto,
  FindCompanyDataByIdDto,
} from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function FindCompanyDataByIdRequest(
  input: FindCompanyDataByIdDto
) {
  const result = await generalApi.get<CompanyDataResponseDto>(
    `find-company-data-by-id/${input.companyDataId}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
