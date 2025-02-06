import {
  AppThemeProvider,
  DrawerProvider,
  LoggedUserProvider,
  MargentaBlueDarkTheme,
  MargentaBlueLightTheme,
  SimpleDrawer,
} from '@pure-workspace/feature';
import { AppRouters } from './app-routers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FC } from 'react';

interface ContentAppProps {
  clientId: string;
}

export const ContentApp: FC<ContentAppProps> = ({ clientId }) => {
  return (
    <AppThemeProvider
      selectedLightTheme={MargentaBlueLightTheme}
      selectedDarkTheme={MargentaBlueDarkTheme}
    >
      <LoggedUserProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <DrawerProvider>
            <SimpleDrawer>
              <AppRouters />
            </SimpleDrawer>
          </DrawerProvider>
        </GoogleOAuthProvider>
      </LoggedUserProvider>
    </AppThemeProvider>
  );
};
