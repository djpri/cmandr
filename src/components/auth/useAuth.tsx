import {
  AuthenticationResult,
  CacheLookupPolicy,
  InteractionRequiredAuthError,
  SilentRequest,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { CmandrApi } from "api";
import { apiConfig } from "auth/auth";
import { useEffect, useState } from "react";

/**
 * This component is responsible for authenticating the user and setting the user session in the redux store.
 * It also handles the redirect from the Azure B2C login page.
 * This must be wrapped in the redux provider component.
 */
const useAuth = () => {
  const [authSuccess, setAuthSuccess] = useState(false);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const getToken = async ({ fromCache = true }: { fromCache: boolean }) => {
      if (!accounts[0]) return null;

      const silentRequest: SilentRequest = {
        scopes: apiConfig.b2cScopes,
        account: accounts[0],
        cacheLookupPolicy: fromCache
          ? CacheLookupPolicy.Default
          : CacheLookupPolicy.RefreshToken,
      };

      try {
        const response: AuthenticationResult =
          await instance.acquireTokenSilent(silentRequest);

        setAuthSuccess(true);
        return response?.accessToken || null;
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          await instance.acquireTokenRedirect(silentRequest);
        }
      }
    };

    getToken({ fromCache: true });

    const interceptor = CmandrApi.interceptors.request.use(
      async function (config) {
        const token = await getToken({ fromCache: true });
        config.headers.Authorization = `bearer ${token}`;
        return config;
      },
      async function (error) {
        const silentRequest: SilentRequest = {
          scopes: apiConfig.b2cScopes,
          account: accounts[0],
          cacheLookupPolicy: CacheLookupPolicy.RefreshToken,
        };
        await instance.acquireTokenSilent(silentRequest);
        return Promise.reject(error);
      }
    );
    return () => {
      CmandrApi.interceptors.request.eject(interceptor);
    };
  }, [instance, accounts]);

  return {
    authSuccess,
  };
};

export default useAuth;
