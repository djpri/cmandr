import {
  AccountInfo,
  AuthenticationResult,
} from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { CmandrApi } from "api";
import { apiConfig } from "auth/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserSession, setEndOfUserSession } from "redux/slices/appSlice";

const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch();

  const account: AccountInfo = accounts[0] || null;

  useEffect(() => {
    const getToken = async () => {
      const silentRequest = {
        scopes: apiConfig.b2cScopes,
        account: accounts[0],
      };

      const response: AuthenticationResult = await instance.acquireTokenSilent(
        silentRequest
      );

      if (response?.accessToken === null) {
        dispatch(setEndOfUserSession);
      }

      dispatch(setUserSession());
      return response.accessToken;
    };

    getToken();

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
  }, [instance, account, dispatch]);

  return <>{children}</>;
};


/**
 * This component is responsible for authenticating the user and setting the user session in the redux store.
 * It also handles the redirect from the Azure B2C login page.
 * This must be wrapped in the redux provider component.
 */
const CustomMsalProvider = ({ children, instance }) => {
  return (
    <MsalProvider instance={instance}>
      <AuthProvider>{children}</AuthProvider>
    </MsalProvider>
  );
};

export default CustomMsalProvider;
