import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import CreateCommand from "./components/CreateCommand/CreateCommand";
import { selectUserUid, setAuthListener } from "./redux/auth/authSlice";
import { useAppDispatch } from "./redux/store";
import { getCommandsAndCategoriesFromDB } from "./services/commands/getCommandsAndCategoriesFromDB";
import theme from "./theme/theme";
import AllCommandsPage from "./views/AllCommandsPage/AllCommandsPage";
import HomePage from "./views/Home/HomePage";

export const App = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUserUid);

  // check if user is still logged in from previous session
  // update redux state when current user is logged in or out
  React.useEffect(() => {
    dispatch(setAuthListener());
  }, [dispatch]);

  // fill command data if there is a user logged in, empty when user logs out
  React.useEffect(() => {
    dispatch(getCommandsAndCategoriesFromDB());
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
          {/* <CommandCategoryPage /> */}
        </Route>
      </BrowserRouter>
    </ChakraProvider>
  );
};
