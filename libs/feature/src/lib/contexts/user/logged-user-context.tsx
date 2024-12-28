import { LoggedUser } from '@pure-workspace/domain';
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getItemLocalStorage } from '../../services';

interface LoggedUserContextProps {
  loggedUser: LoggedUser | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
}

const LoggedUserContext = createContext<LoggedUserContextProps>({
  loggedUser: null,
  setLoggedUser: () => {
    ('');
  },
});

export const LoggedUserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  useEffect(() => {
    const storedUser = getItemLocalStorage('lu');
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export const useLoggedUser = () => useContext(LoggedUserContext);
