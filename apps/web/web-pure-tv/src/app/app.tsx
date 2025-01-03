import './app.scss';
import {
  AppThemeProvider,
  LoggedUserProvider,
  LoadingProvider,
} from '@pure-workspace/feature';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ContentApp } from './content-app';

const App = () => {
  return (
    <AppThemeProvider>
      <LoggedUserProvider>
        <LoadingProvider>
          <GoogleOAuthProvider
            clientId={process.env['NX_PUBLIC_EXTERNAL_CLIENT_ID'] ?? ''}
          >
            <ContentApp />
          </GoogleOAuthProvider>
        </LoadingProvider>
      </LoggedUserProvider>
    </AppThemeProvider>
  );
};

export default App;
