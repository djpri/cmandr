import { useAccount, useMsal } from "@azure/msal-react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { CmandrApi } from "api";
import { apiConfig } from "auth/apiConfig";
import UserLayout from "components/layout/UserLayout";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setUserSession } from "redux/slices/appSlice";
import Links from "views/AllLinks";
import Home from "views/Home";
import LinkCategory from "views/LinkCategory";
import theme from "./theme/theme";
import AllCommands from "./views/AllCommands";
import CommandCategory from "./views/CommandCategory";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";

export const App = () => {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch();

  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    const handleRedirect = async () => {
      await instance.handleRedirectPromise();
    };
    const getToken = async () => {
      const accounts = instance.getAllAccounts();
      if (accounts?.length === 0) return null;
      const response = await instance.acquireTokenSilent({
        scopes: apiConfig.b2cScopes,
        account: accounts[0],
      });
      if (!response) return null;
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
      <Suspense fallback={<UserLayout>{/* <Spinner /> */}</UserLayout>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/commands" element={<AllCommands />} />
          <Route path="/commands/:id" element={<CommandCategory />} />
          <Route path="/links" element={<Links />} />
          <Route path="/links/:id" element={<LinkCategory />} />
          <Route path="/account/login" element={<Login />} />
        </Routes>
      </Suspense>
    </ChakraProvider>
  );
};
