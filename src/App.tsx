import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import CreateCommand from "./components/commands/CreateCommand/CreateCommand";
import { selectUserUid, setAuthListener } from "./redux/auth/authSlice";
import { useAppDispatch } from "./redux/store";
import { getCommandCategoriesFromDB } from "./services/commandCategories/getCommandCategoriesFromDB";
import { getLinkCategoriesFromDB } from "./services/linkCategories/getLinkCategoriesFromDB";
import theme from "./theme/theme";
import AllCommandsPage from "./views/Commands/AllCommandsPage";
import CommandCategoryPage from "./views/CommandCategory/CommandCategoryPage";
import HomePage from "./views/Home/HomePage";
import LinkCategory from "./views/LinkCategory/LinkCategory";
import Links from "./views/Links/Links";
import LoginPage from "./views/LoginPage/LoginPage";

export const App = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUserUid);

  // check if user is still logged in from previous session
  // update redux state when current user is logged in or out
  React.useEffect(() => {
    dispatch(setAuthListener());
  }, [dispatch]);

  // fill category data if there is a user logged in, empty when user logs out
  React.useEffect(() => {
    if (user) {
      dispatch(getCommandCategoriesFromDB());
      dispatch(getLinkCategoriesFromDB());
    }
  }, [user, dispatch]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/manage-commands">
          <CreateCommand />
        </Route>
        <Route exact path="/commands">
          <AllCommandsPage />
        </Route>
        <Route exact path="/commands/:id">
          <CommandCategoryPage />
        </Route>
        <Route exact path="/links">
          <Links />
        </Route>
        <Route exact path="/links/:id">
          <LinkCategory />
        </Route>
        <Route exact path="/account/login">
          <LoginPage />
        </Route>
      </BrowserRouter>
    </ChakraProvider>
  );
};
