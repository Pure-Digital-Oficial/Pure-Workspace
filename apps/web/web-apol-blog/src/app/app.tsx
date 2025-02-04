import { ContentApp } from './content-app';
import { env } from './env';

export function App() {
  return <ContentApp clientId={env.NX_PUBLIC_EXTERNAL_CLIENT_ID} />;
}

export default App;
