import { CLIENT_ID } from "helpers/environment";
import { b2cPolicies } from "./policies";

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
