import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from 'services/msal';
import 'bootstrap/dist/css/bootstrap.min.css';  // here we include bootstrap across our app

function MyApp({ Component, pageProps }) {
  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  );
}

export default MyApp;
