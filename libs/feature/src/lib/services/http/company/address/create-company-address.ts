import { CreateCompanyAddressDto } from '@pure-workspace/domain';
import { generalApi } from '../../axios-config';

export async function CreateCompanyAddressRequest(
  input: CreateCompanyAddressDto
) {
  const result = await generalApi.post(
    'create-company-address',
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
        companyId: input.companyId,
      },
    }
  );

  return result.data;
}
