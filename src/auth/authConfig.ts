import { b2cPolicies } from "./policies";

export const msalConfig = {
  auth: {
    clientId: "aa645fe5-eb96-4321-8a0c-fbb8fdba76e2",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};
