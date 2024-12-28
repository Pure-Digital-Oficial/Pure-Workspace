import { CreateAuthDto } from '@pure-workspace/domain';
import { generalApi } from '../axios-config';

export async function CreateAuth(input: CreateAuthDto) {
  const result = await generalApi.post<CreateAuthDto>('create-auth', input);
  return result.data;
}
