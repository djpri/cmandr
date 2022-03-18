import { useAccount, useMsal } from "@azure/msal-react";
import { ChakraProvider, CSSReset, Spinner } from "@chakra-ui/react";
import { CmandrApi } from "api";
import { apiConfig } from "auth/apiConfig";
import UserLayout from "components/layout/UserLayout";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import theme from "./theme/theme";
import AllCommandsPage from "./views/AllCommands";
import CommandCategoryPage from "./views/CommandCategory";
import HomePage from "./views/Home";
import LoginPage from "./views/Login";

const Links = lazy(() => import("./views/AllLinks"));
const LinkCategory = lazy(() => import("./views/LinkCategory"));

export const App = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    const handleRedirect = async () => {
      await instance.handleRedirectPromise();
    };
    const getToken = async () => {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        const response = await instance.acquireTokenSilent({
          scopes: apiConfig.b2cScopes,
          account: accounts[0],
        });
        return response.accessToken;
      }
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
  }, [instance, account]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Suspense
        fallback={
          <UserLayout>
            <Spinner />
          </UserLayout>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/commands" element={<AllCommandsPage />} />
          <Route path="/commands/:id" element={<CommandCategoryPage />} />
          <Route path="/links" element={<Links />} />
          <Route path="/links/:id" element={<LinkCategory />} />
          <Route path="/account/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </ChakraProvider>
  );
};
