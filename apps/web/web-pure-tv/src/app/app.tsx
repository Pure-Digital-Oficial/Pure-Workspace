import './app.scss';
import {
  AppThemeProvider,
  LoggedUserProvider,
  LoadingProvider,
} from '@pure-workspace/feature';

import { ContentApp } from './content-app';

const App = () => {
  return (
    <AppThemeProvider>
      <LoggedUserProvider>
        <LoadingProvider>
          <ContentApp />
        </LoadingProvider>
      </LoggedUserProvider>
    </AppThemeProvider>
  );
};

export default App;
