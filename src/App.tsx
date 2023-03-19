import { useAccount, useMsal } from "@azure/msal-react";
import { ChakraProvider, CSSReset, Spinner } from "@chakra-ui/react";
import { CmandrApi } from "api";
import { apiConfig } from "auth/apiConfig";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setEndOfUserSession, setUserSession } from "redux/slices/appSlice";
import Dashboard from "views/Dashboard";
import Home from "views/Home";
import theme from "./theme/theme";

const AllCommands = lazy(() => import("views/AllCommands"));
const CommandCategory = lazy(() => import("views/CommandCategory"));
const Links = lazy(() => import("views/AllLinks"));
const LinkCategory = lazy(() => import("views/LinkCategory"));
const UserLayout = lazy(() => import("components/layout/UserLayout"));

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
      <Suspense fallback={<UserLayout><Spinner /></UserLayout>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/commands" element={<AllCommands />} />
          <Route path="/commands/:id" element={<CommandCategory />} />
          <Route path="/links" element={<Links />} />
          <Route path="/links/:id" element={<LinkCategory />} />
        </Routes>
      </Suspense>
    </ChakraProvider>
  );
};
