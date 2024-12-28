import {
  CompanySimpleResponseDto,
  FindSimpleCompanyByIdDto,
} from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function FindSimpleCompanyByIdRequest(
  input: FindSimpleCompanyByIdDto
) {
  const result = await generalApi.get<CompanySimpleResponseDto>(
    `find-simple-company-by-id/${input.companyId}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
