import * as msal from '@azure/msal-browser';

// const { NEXT_PUBLIC_AZURE_AD_TENANT_ID, NEXT_PUBLIC_AZURE_AD_CLIENT_ID } = process.env; // this statement throws an error that `process` is undefined (since the latest NextJs does not allow it [https://nextjs.org/docs/basic-features/environment-variables])

const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_AZURE_AD_REDIRECT_URL,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
const loginRequest = {
  scopes: ["User.Read"]
 };


 // Add the endpoints here for Microsoft Graph API services you'd like to use.
 const graphConfig = {
     graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
 };

export { msalInstance, loginRequest, graphConfig };
