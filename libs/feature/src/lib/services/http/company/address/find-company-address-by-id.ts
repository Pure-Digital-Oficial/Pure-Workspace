import {
  CompanyAddressResponseDto,
  FindCompanyAddressByIdDto,
} from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function FindCompanyAddressByIdRequest(
  input: FindCompanyAddressByIdDto
) {
  const result = await generalApi.get<CompanyAddressResponseDto>(
    `find-company-address-by-id/${input.companyAddressId}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
