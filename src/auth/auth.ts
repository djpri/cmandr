import { PublicClientApplication } from "@azure/msal-browser/dist/app/PublicClientApplication";
import { CLIENT_ID } from "helpers/environment";

export const apiConfig = {
  b2cScopes: ["https://CmandrApp.onmicrosoft.com/CmandrApi/access_as_user"],
  webApi: "http://localhost:44310",
};

const b2cPolicies = {
  names: {
    signIn: "B2C_1_sign_in",
    signUpSignIn: "B2C_1_signup_signin",
    forgotPassword: "B2C_1_reset",
    editProfile: "B2C_1_edit",
  },
  authorities: {
    signIn: {
      authority:
        "https://CmandrApp.b2clogin.com/CmandrApp.onmicrosoft.com/B2C_1_sign_in",
    },
    signUpSignIn: {
      authority:
        "https://CmandrApp.b2clogin.com/CmandrApp.onmicrosoft.com/B2C_1_signup_signin",
    },
    forgotPassword: {
      authority:
        "https://CmandrApp.b2clogin.com/CmandrApp.onmicrosoft.com/B2C_1_reset",
    },
    editProfile: {
      authority:
        "https://CmandrApp.b2clogin.com/CmandrApp.onmicrosoft.com/B2C_1_edit",
    },
  },
  authorityDomain: "CmandrApp.b2clogin.com",
};

export const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: b2cPolicies.authorities.signIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
