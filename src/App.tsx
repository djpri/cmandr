import { useAccount, useMsal } from "@azure/msal-react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { apiConfig } from "auth/apiConfig";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getCommandCategoriesFromDB } from "./api/handlers/commandCategories/getCommandCategoriesFromDB";
import { getLinkCategoriesFromDB } from "./api/handlers/linkCategories/getLinkCategoriesFromDB";
import CreateCommand from "./components/commands/CreateCommand/CreateCommand";
import { selectUserUid, setAuthListener } from "./redux/auth/authSlice";
import { useAppDispatch } from "./redux/store";
import theme from "./theme/theme";
import AllCommandsPage from "./views/AllCommands";
import Links from "./views/AllLinks";
import CommandCategoryPage from "./views/CommandCategory";
import HomePage from "./views/Home";
import LinkCategory from "./views/LinkCategory";
import LoginPage from "./views/Login";

export const App = () => {
  const dispatch = useAppDispatch();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const user = useSelector(selectUserUid);

  useEffect(() => {
    const handleRedirect = async () => {
      await instance.handleRedirectPromise();

      const accounts = instance.getAllAccounts();
      console.log(accounts);
      if (accounts.length === 0) {
        // No user signed in
        // SHOW LOGIN PAGE
      } else {
        const response = await instance.acquireTokenSilent({
          scopes: apiConfig.b2cScopes,
          account: account,
        });
        console.log(response.accessToken);
      }
    };
    handleRedirect();
  }, []);

  // check if user is still logged in from previous session
  // update redux state when current user is logged in or out
  useEffect(() => {
    dispatch(setAuthListener());
  }, [dispatch]);

  // fill category data if there is a user logged in, empty when user logs out
  useEffect(() => {
    if (user) {
      dispatch(getCommandCategoriesFromDB());
      dispatch(getLinkCategoriesFromDB());
    }
  }, [user, dispatch]);

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
