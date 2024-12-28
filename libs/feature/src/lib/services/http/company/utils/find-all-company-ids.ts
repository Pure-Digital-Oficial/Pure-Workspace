import {
  CompanyAllIdsResponseDto,
  FindAllCompanyIdsDto,
} from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function FindAllCompanyIdsRequest(input: FindAllCompanyIdsDto) {
  const result = await generalApi.get<CompanyAllIdsResponseDto>(
    `find-all-company-ids/${input.companyId}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
