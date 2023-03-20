import { useAccount, useMsal } from "@azure/msal-react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { CmandrApi } from "api";
import { apiConfig } from "auth/apiConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { setEndOfUserSession, setUserSession } from "redux/slices/appSlice";
import { router } from "routes";
import theme from "./theme/theme";

export const App = () => {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch();

  const account = useAccount(accounts[0] || null);

  useEffect(() => {
    if (account) {
      dispatch(setUserSession());
    } else {
      dispatch(setEndOfUserSession());
    }
  }, [account, dispatch]);

  useEffect(() => {
    const handleRedirect = async () => {
      await instance.handleRedirectPromise();
    };
    const getToken = async () => {
      const accounts = instance.getAllAccounts();
      if (accounts?.length === 0) {
        dispatch(setEndOfUserSession());
        return null;
      }
      const response = await instance.acquireTokenSilent({
        scopes: apiConfig.b2cScopes,
        account: accounts[0],
      });
      if (!response) {
        dispatch(setEndOfUserSession());
        return null;
      }
      dispatch(setUserSession());
      return response.accessToken;
    };
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
    handleRedirect();
  }, [instance, account, dispatch]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
};
