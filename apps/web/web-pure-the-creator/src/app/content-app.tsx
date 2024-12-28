import {
  DrawerProvider,
  FileModalContainer,
  FileModalProvider,
  getItemLocalStorage,
  MiniDrawer,
  SimpleLoading,
  useAuth,
  useLoading,
} from '@pure-workspace/feature';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRouters, AuthRouters } from './routes';

export const ContentApp = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useLoading();

  useEffect(() => {
    const token = getItemLocalStorage('u');
    if (
      !token &&
      location.pathname !== '/register' &&
      location.pathname !== '/login'
    ) {
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <>
      {!auth.isAuthenticated && <AuthRouters />}
      {auth.isAuthenticated && (
        <>
          <SimpleLoading open={isLoading} />
          <DrawerProvider>
            <FileModalProvider>
              <MiniDrawer
                companyList={false}
                image="https://github.com/ErickCelestino.png"
              >
                <AppRouters />
                <FileModalContainer />
              </MiniDrawer>
            </FileModalProvider>
          </DrawerProvider>
        </>
      )}
    </>
  );
};
