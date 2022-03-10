import { useAccount, useMsal } from "@azure/msal-react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { CmandrApi } from "api/endpoints";
import { apiConfig } from "auth/apiConfig";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CreateCommand from "./components/commands/CreateCommand/CreateCommand";
import theme from "./theme/theme";
import AllCommandsPage from "./views/AllCommands";
import Links from "./views/AllLinks";
import CommandCategoryPage from "./views/CommandCategory";
import HomePage from "./views/Home";
import LinkCategory from "./views/LinkCategory";
import LoginPage from "./views/Login";

export const App = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    const handleRedirect = async () => {
      await instance.handleRedirectPromise();
    };
    CmandrApi.interceptors.request.use(
      async function (config) {
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage-commands" element={<CreateCommand />} />
        <Route path="/commands" element={<AllCommandsPage />} />
        <Route path="/commands/:id" element={<CommandCategoryPage />} />
        <Route path="/links" element={<Links />} />
        <Route path="/links/:id" element={<LinkCategory />} />
        <Route path="/account/login" element={<LoginPage />} />
      </Routes>
    </ChakraProvider>
  );
};
