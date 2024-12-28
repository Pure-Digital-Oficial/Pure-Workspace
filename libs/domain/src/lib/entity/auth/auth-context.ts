import { LoginResponse } from '../../dto';
import { ILoggedUser } from './logged-user';

export interface IAuthContext extends ILoggedUser {
  authenticate: (
    email: string,
    password: string,
    service: (email: string, password: string) => Promise<LoginResponse>
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
