import {
  AppThemeProvider,
  FileModalProvider,
  LoggedUserProvider,
  greenDarkTheme,
  greenLightTheme,
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
      selectedLightTheme={greenLightTheme}
      selectedDarkTheme={greenDarkTheme}
    >
      <LoggedUserProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <FileModalProvider>
            <AppRouters />
          </FileModalProvider>
        </GoogleOAuthProvider>
      </LoggedUserProvider>
    </AppThemeProvider>
  );
};
