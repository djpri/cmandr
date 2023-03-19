import { b2cPolicies } from "./policies";

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: b2cPolicies.authorities.signIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};
