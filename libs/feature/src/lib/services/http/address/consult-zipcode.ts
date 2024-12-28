import {
  ConsultZipcodeDto,
  SimpleAddressResponseDto,
} from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function ConsultZipcodeRequest(input: ConsultZipcodeDto) {
  const result = await generalApi.get<SimpleAddressResponseDto>(
    `consult-zipcode/${input.zipcode}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
