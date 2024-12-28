import { createContext, FC, ReactNode, useContext } from 'react';

interface AppContextProps {
  appId: string;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppIdProvider: FC<{ children: ReactNode; appId: string }> = ({
  children,
  appId,
}) => {
  return (
    <AppContext.Provider value={{ appId }}>{children}</AppContext.Provider>
  );
};

export const useAppIdContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
