import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ValidateTokenRequest,
  getItemLocalStorage,
  getUserLocalStorage,
  setUserLocalStorage,
} from '../../services';
import {
  IAuthContext,
  IAuthProvider,
  ILoggedUser,
  LoggedUser,
  LoginResponse,
} from '@pure-workspace/domain';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<ILoggedUser | null>();

  // Load user from localStorage on startup
  useEffect(() => {
    const storedUser: ILoggedUser = getUserLocalStorage();
    const loggeduser: LoggedUser = JSON.parse(getItemLocalStorage('lu'));
    if (storedUser?.token) {
      validateToken(storedUser?.token ?? '', loggeduser?.id ?? '');
    }
  }, []);

  // Function to validate the token
  const validateToken = useCallback(
    async (token: string, loggedUserId: string) => {
      const storedUser: ILoggedUser = getUserLocalStorage();
      try {
        const validate = await ValidateTokenRequest({
          loggedUserId,
          token,
        });
        if (validate) {
          setUser(storedUser);
        }
      } catch (error) {
        logout();
      }
    },
    []
  );

  const authenticate = useCallback(
    async (
      email: string,
      password: string,
      service: (email: string, password: string) => Promise<LoginResponse>
    ) => {
      const response = await service(email, password);
      const payload = { token: response.token, email };

      setUser(payload);
      setUserLocalStorage(payload);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setUserLocalStorage(null);
    window.location.reload();
  }, []);

  // Checks if the user is authenticated
  const isAuthenticated = useMemo(() => !!user, [user]);

  return (
    <AuthContext.Provider
      value={{ ...user, authenticate, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
