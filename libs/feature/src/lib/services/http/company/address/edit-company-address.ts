import { EditCompanyAddressDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function EditCompanyAddressRequest(input: EditCompanyAddressDto) {
  const result = await generalApi.put<{ companyAddressId: string }>(
    `edit-company-address/${input.companyAddressId}`,
    {
      cityId: input.body.cityId,
      stateId: input.body.stateId,
      countryId: input.body.countryId,
      district: input.body.district,
      number: input.body.number,
      street: input.body.street,
      zipcode: input.body.zipcode,
      complement: input.body.complement,
    },
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
