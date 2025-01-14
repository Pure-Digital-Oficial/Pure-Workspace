import { ContentApp } from './content-app';

export function App() {
  return (
    <ContentApp clientId={process.env['NX_PUBLIC_EXTERNAL_CLIENT_ID'] ?? ''} />
  );
}

export default App;
