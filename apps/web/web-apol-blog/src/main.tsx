import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { AppIdProvider } from '@pure-workspace/feature';

const appId = process.env['NX_PUBLIC_FRONT_APOL_BLOG'] || '';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <AppIdProvider appId={appId}>
        <App />
      </AppIdProvider>
    </BrowserRouter>
  </StrictMode>
);
