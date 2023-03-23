import {
  AuthenticationResult,
  CacheLookupPolicy,
  InteractionRequiredAuthError,
  PublicClientApplication,
  SilentRequest,
} from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { CmandrApi } from "api";
import { apiConfig } from "auth/auth";
import { FC, PropsWithChildren, useEffect } from "react";
import { setEndOfUserSession, setUserSession } from "redux/slices/appSlice";
import { useAppDispatch } from "redux/store";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { instance, accounts } = useMsal();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getToken = async () => {
      if (!accounts[0]) return null;

      const silentRequest: SilentRequest = {
        scopes: apiConfig.b2cScopes,
        account: accounts[0],
        cacheLookupPolicy: CacheLookupPolicy.Default,
      };

      try {
        const response: AuthenticationResult =
          await instance.acquireTokenSilent(silentRequest);

        if (response?.accessToken === null) dispatch(setEndOfUserSession);

        dispatch(setUserSession());
        return response?.accessToken || null;
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          await instance.acquireTokenRedirect(silentRequest);
        }
      }
    };

    getToken();
    dispatch(setUserSession());

    CmandrApi.interceptors.request.use(
      async function (config) {
        const token = await getToken();
        config.headers.Authorization = `bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, [instance, accounts, dispatch]);

  return <>{children}</>;
};

/**
 * This component is responsible for authenticating the user and setting the user session in the redux store.
 * It also handles the redirect from the Azure B2C login page.
 * This must be wrapped in the redux provider component.
 */

interface CustomMsalProviderProps {
  instance: PublicClientApplication;
}

const CustomMsalProvider: FC<PropsWithChildren<CustomMsalProviderProps>> = (
  { instance, children },
) => {
  return (
    <MsalProvider instance={instance}>
      <AuthProvider>{children}</AuthProvider>
    </MsalProvider>
  );
};

export default CustomMsalProvider;
