import { AuthStatus } from '../../../type';

export interface AuthPrismaDto {
  user_id: string;
  status: AuthStatus;
  email: string;
  auth_id: string;
  password: string | null;
}
