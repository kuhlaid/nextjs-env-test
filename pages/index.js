/**
 * @abstract Simple test script to work with Microsoft Graph
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react
 */

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import { useState } from 'react';
import { loginRequest } from 'services/msal';
import Head from 'next/head';
import { ProfileData } from "components/ProfileData";
import { callMsGraph } from "services/graph";
import Layout from 'components/layout';
import Button from 'react-bootstrap/Button';

const {adTenantId} = require('/next.config');

function SignInButton() {
  // useMsal hook will return the PublicClientApplication instance you provided to MsalProvider
  const { instance } = useMsal();

  return <button onClick={() => signIn(instance)}>Sign In</button>;
}

function SignOutButton() {
  const { instance } = useMsal();

  return <Button onClick={() => instance.logoutRedirect()} className="btn btn-primary m-2">Sign Out</Button>;
}

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const name = accounts?.[0] && accounts?.[0].name;

  // function RequestProfileData() {
  //   const request = {
  //       ...loginRequest,
  //       account: accounts?.[0]
  //   };

  //   console.log("RequestProfileData");
  //   // Silently acquires an access token which is then attached to a request for Microsoft Graph data
  //   instance.acquireTokenSilent(request).then((response) => {
  //       callMsGraph(response.accessToken).then(response => setGraphData(response));
  //   }).catch((e) => {
  //       instance.acquireTokenPopup(request).then((response) => {
  //           callMsGraph(response.accessToken).then(response => setGraphData(response));
  //       });
  //   });
  // }

  // onClick={() => {RequestProfileData()}}
  return (
      <>
          <div className="text-5xl fw100 animate-bounce-alt animate-count-infinite animate-duration-1s">Welcome - {name}</div>
          {graphData ? 
              <ProfileData graphData={graphData} />
              :
              <button variant="secondary">Request Profile Information</button>
          }
      </>
  );
};

// this needs to be done asyncronously
async function signIn(instance) {
  console.log(`signIn started for https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`);
  await instance.handleRedirectPromise();
  await instance.loginPopup(); //await instance.loginRedirect(); // this redirect is causing problems on production so switching to popup
}

function WelcomeUser() {
  const { accounts } = useMsal();
  const username = accounts?.[0].username;

  return <p>Welcome, {username}</p>;
}

export default function Home({strTESTEV}) {
  return (
    <Layout>
      <Head>
        <title>Azure AD Authentication using MSAL and Next.js</title>
      </Head>

      <AuthenticatedTemplate>
        <p>This will only render if a user is signed-in. v0.6.1 {strTESTEV} :: {adTenantId}</p>
        <WelcomeUser />
        <ProfileContent />
        <SignOutButton />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>This will only render if a user is not signed-in. v0.6.1 {strTESTEV} :: {adTenantId}</p>
        <code>Public var direct:{process.env.NEXT_PUBLIC_ANALYTICS_ID}</code>
        <SignInButton />
      </UnauthenticatedTemplate>
    </Layout>
  );
}

export async function getServerSideProps() {
  const strTESTEV = process.env.PLAIN_VAR_WPG
  return {
    props: { strTESTEV }
  }
}
